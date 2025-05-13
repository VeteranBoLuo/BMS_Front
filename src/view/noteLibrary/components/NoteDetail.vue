<template>
  <div class="note-container">
    <NoteHeader
      :updateTime="updateTime"
      :nodeType="nodeType"
      :readonly="readonly"
      :isStartEdit="isStartEdit"
      @focusout="titleBlur"
      @del="delNote"
      @save="clickSaveNote"
      @saveTag="clickSaveNote"
    />
    <div class="note-body">
      <Catalog :content="note.content" />
      <div class="note-body-header footer-center">
        <div class="note-body-title n-title">
          <a-input :disabled="readonly" v-model:value="note.title" @focusout="inputBlur" placeholder="请输入标题" />
        </div>
        <TinyMac
          v-if="isReady"
          v-model:value="note.content"
          style="flex-grow: 1"
          :noteId="note.id"
          :readonly="readonly"
          @setNoteId="setNoteId"
          @saveData="saveFunc(true)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import TinyMac from '@/view/noteLibrary/TinyMac.vue';
  import { computed, nextTick, onMounted, onUnmounted, provide, reactive, ref, watch } from 'vue';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import router from '@/router';
  import { cloneDeep } from 'lodash-es';
  import { apiBasePost } from '@/http/request.ts';
  import Catalog from '@/view/noteLibrary/components/Catalog.vue';
  import Alert from '@/components/BasicComponents/BModal/Alert.ts';
  import { message } from 'ant-design-vue';
  import { bookmarkStore, noteStore, useUserStore } from '@/store';
  import NoteHeader from '@/view/noteLibrary/components/NoteHeader.vue';
  const bookmark = bookmarkStore();
  const user = useUserStore();
  const note = reactive({
    id: '',
    title: '未命名文档',
    lastTitle: '未命名文档',
    content: '',
    tags: '',
    createBy: '',
  });

  provide('note', note);
  const nodeType = ref<'edit' | 'add' | 'share'>('edit');
  function setNoteId(id) {
    note.id = id;
  }

  const readonly = computed(() => {
    if (bookmark.isPhone) {
      return true;
    } else if (user.role === 'root') {
      return false;
    } else if (nodeType.value === 'share') {
      return true;
    } else if (nodeType.value === 'add') {
      return false;
    } else {
      return userId !== note.createBy;
    }
  });
  function inputBlur() {
    nextTick(() => {
      if (!note.title) {
        note.title = note.lastTitle;
        document.getElementById('note-header-title').innerText = note.title;
        return;
      }
      if (note.title !== note.lastTitle) {
        document.getElementById('note-header-title').innerText = note.title;
        note.lastTitle = cloneDeep(note.title);
        saveFunc();
      }
    });
  }

  function titleBlur() {
    nextTick(() => {
      const title = document.getElementById('note-header-title');
      const text = title.innerText;
      if (!text || text === '\n') {
        note.title = note.lastTitle;
        title.innerText = note.lastTitle;
        return;
      }
      if (text !== note.lastTitle) {
        note.title = text;
        note.lastTitle = cloneDeep(note.title);
        saveFunc();
      }
    });
  }

  const content = ref('');
  const isStartEdit = ref(false);
  const isCurrentSave = ref(false);
  const updateTime = ref('');
  function setUpdateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    updateTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  async function saveNote(isMsg?: boolean) {
    isStartEdit.value = true;
    isCurrentSave.value = true;
    const params: any = cloneDeep(note);
    delete params.lastTitle;
    let res;
    if (params.id) {
      delete params.createBy;
      res = await apiBasePost('/api/note/updateNote', params);
    } else {
      res = await apiBasePost('/api/note/addNote', params);
    }
    if (res.status === 200) {
      if (res.data.id) {
        note.id = res.data.id;
        router.push(`/noteLibrary/${note.id}`).then();
      }
      setTimeout(() => {
        isStartEdit.value = false;
        timer.value = null;
        if (isMsg) {
          message.success('保存成功');
        }
        setUpdateTime();
        clearTimeout(timer.value);
      }, 500);
    }
  }

  function clickSaveNote() {
    saveFunc(true);
  }

  const timer = ref(null);
  function saveFunc(isMsg?: boolean) {
    if (!['admin', 'root'].includes(user.role)) {
      return;
    }
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
      saveNote(isMsg);
    }, 300);
  }

  function delNote() {
    Alert.alert({
      title: '提示',
      content: `请确认是否要删除此笔记？`,
      onOk() {
        apiBasePost('/api/note/delNote', {
          id: note.id,
        }).then((res) => {
          if (res.status) {
            message.success('删除成功');
            router.back();
          }
        });
      },
    });
  }

  const handleKeyDown = (event) => {
    // 检查是否按下了ctrl+s
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault(); // 阻止默认的保存行为
      saveFunc(true);
    }
  };

  function back() {
    if (nodeType.value === 'add') {
      router.push('/noteLibrary');
    } else if (nodeType.value === 'share') {
      router.push('/home');
    } else {
      router.back();
    }
  }
  const userId = localStorage.getItem('userId');
  const isReady = ref(false);
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (router.currentRoute.value.params.value !== 'add') {
      apiBasePost('/api/note/getNoteDetail', {
        id: router.currentRoute.value.params.value,
      })
        .then((res) => {
          if (res.status === 200) {
            Object.assign(note, res.data);
            note.lastTitle = cloneDeep(note.title);
            if (!bookmark.isPhone) {
              document.getElementById('note-header-title').innerText = note.title;
            }
            updateTime.value = res.data.updateTime ?? res.data.createTime;
          }
        })
        .finally(() => {
          isReady.value = true;
          if (userId !== note.createBy) {
            nodeType.value = 'share';
            const observer = new MutationObserver(() => {
              const el: any = document.querySelector('.tox-editor-header');
              if (el) {
                el.style.display = 'none';
                observer.disconnect();
              }
            });
            const config = { childList: true, subtree: true };
            observer.observe(document.body, config);
          }
          watch(
            () => note.content,
            () => {
              saveFunc();
            },
          );
        });
    } else {
      isReady.value = true;
      nodeType.value = 'add';
      setUpdateTime();
      watch(
        () => note.content,
        () => {
          saveFunc();
        },
      );
    }
  });
  const nStore = noteStore();
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
    nStore.headings = [];
  });
</script>

<style lang="less">
  .note-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed !important;
    top: 0 !important;
    display: flex;
    flex-direction: column;
  }
  .note-body-title {
    .ant-input {
      height: 50px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      border-radius: 0;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.1s linear;
      background-color: var(--bl-input-bg-color);
      color: var(--bl-input-color);
      font-weight: 600;
      border: none;
      box-shadow: unset !important;
      font-size: 25px;
      &:focus {
        border: none;
      }
    }
  }
  .note-body {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    position: fixed;
    top: 60px;
    width: 100%;
  }
  .back-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    cursor: pointer;
    border: 1px solid #e8eaf2;
    transition: border-color 0.1s linear;
    &:hover {
      border-color: var(--primary-color);
    }
  }
  .note-body-header {
    height: calc(100% - 80px);
    width: 60%;
    display: flex;
    flex-direction: column;
  }
  .tag-container {
    padding-left: 15px;
    .note-tag {
      height: 20px;
      box-sizing: border-box;
      cursor: pointer;
      line-height: 16px;
      width: max-content;
      color: #9395ab;
      font-size: 12px;
      font-weight: 550;
      padding: 2px 6px;
      background-color: #edeff5;
      border-radius: 4px;
    }
  }
  @media (max-width: 600px) {
    .note-body-header {
      width: 90%;
    }
  }
</style>
