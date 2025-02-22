<template>
  <div
    style="
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      position: fixed !important;
      top: 0 !important;
      display: flex;
      flex-direction: column;
    "
  >
    <div class="note-header">
      <div style="display: flex; align-items: center" :style="{ gap: bookmark.isPhone ? '0' : '20px' }">
        <div class="back-icon" @click="router.push('/noteLibrary')">
          <SvgIcon :src="icon.noteDetail.back" />
        </div>
        <div
          v-if="!bookmark.isPhone"
          class="note-header-title n-title"
          contenteditable="true"
          id="note-header-title"
          @focusout="titleBlur"
        >
          <!--          {{ note.title }}-->
          <!--          <a-input v-model:value="note.title" @focusout="inputBlur" placeholder="请输入标题"  />-->
        </div>
        <div
          style="color: #c0c0c0; font-size: 12px"
          v-if="!isStartEdit"
          :style="{ marginLeft: bookmark.isPhone ? '20px' : '0' }"
        >
          最近修改 {{ updateTime }}
        </div>
        <div v-else style="color: #c0c0c0; font-size: 12px" :style="{ marginLeft: bookmark.isPhone ? '20px' : '0' }">
          <span>保存中...</span>
        </div>
      </div>
      <div class="flex-align-center" style="gap: 20px">
        <div
          class="note-header-title-icon"
          @click="delNote"
          title="删除"
          v-click-log="{ module: '笔记详情', operation: '删除笔记' }"
        >
          <SvgIcon :src="icon.noteDetail.delete" />
        </div>
        <div
          class="note-header-title-icon"
          @click="clickSaveNote"
          title="保存"
          v-click-log="{ module: '笔记详情', operation: '保存笔记' }"
        >
          <SvgIcon :src="icon.noteDetail.save" />
        </div>
      </div>
    </div>
    <div
      style="
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        height: 100%;
        position: fixed;
        top: 60px;
        width: 100%;
      "
    >
      <Catalog :content="note.content" />
      <div class="note-body-header footer-center">
        <div class="note-body-title n-title">
          <a-input v-model:value="note.title" @focusout="inputBlur" placeholder="请输入标题" />
        </div>
        <!--        <div>-->
        <!--          <div class="tag-container"> <div class="note-tag">+ 自定义标签</div></div>-->
        <!--        </div>-->
        <TinyMac
          v-model:value="note.content"
          style="flex-grow: 1"
          :noteId="note.id"
          :readonly="!['admin', 'root'].includes(user.role)"
          @setNoteId="setNoteId"
          @saveData="saveFunc(true)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import TinyMac from '@/view/noteLibrary/TinyMac.vue';
  import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import router from '@/router';
  import { cloneDeep } from 'lodash-es';
  import { apiBasePost } from '@/http/request.ts';
  import Catalog from '@/view/noteLibrary/components/Catalog.vue';
  import Alert from '@/components/BasicComponents/BModal/Alert.ts';
  import { message } from 'ant-design-vue';
  import { bookmarkStore, noteStore, useUserStore } from '@/store';
  const bookmark = bookmarkStore();
  const user = useUserStore();
  const note = reactive({
    id: '',
    title: '未命名文档',
    lastTitle: '未命名文档',
    content: '',
  });

  function setNoteId(id) {
    note.id = id;
  }
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
    }, 500);
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
          watch(
            () => note.content,
            () => {
              saveFunc();
            },
          );
        });
    } else {
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
  .note-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: var(--note-header-bg-color);
    border-bottom: 1px solid var(--notePage-topBody-border-color);
    position: fixed;
    top: 0;
  }
  .note-header-title {
    padding: 0 10px;
    height: 28px;
    display: flex;
    align-items: center;
    border-radius: 6px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid transparent;
    transition: border-color 0.1s linear;
    &:hover {
      border-color: rgba(0, 0, 0, 0.1) !important;
    }
    &:focus {
      border-color: #615ced !important;
    }
    &:empty:before {
      color: #aaa;
      content: '未命名文档';
    }
  }
  .note-header-title-icon {
    background-color: white;
    width: 36px;
    height: 36px;
    border: 1px solid #e8eaf2;
    border-radius: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #222222;
    transition: border-color 0.1s linear;
    &:hover {
      border-color: var(--primary-color);
    }
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
