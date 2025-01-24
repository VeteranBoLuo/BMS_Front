<template>
  <div style="width: 100%; height: 100%">
    <div class="note-header">
      <div class="back-icon" @click="router.back()">
        <SvgIcon :src="icon.note_detail_back" />
      </div>
      <div contenteditable="true" class="note-header-title n-title" @input="handleInput" @paste="handlePaste">{{
        note.title
      }}</div>
      <div style="color: #c0c0c0; font-size: 12px" v-if="!isStartEdit"> 最近修改 {{ updateTime }} </div>
      <div style="color: #c0c0c0; font-size: 12px" v-else>
        <span v-if="isCurrentSave">保存中...</span>
        <span v-else>文档已实时保存</span>
      </div>
    </div>
    <div style="display: flex; padding: 20px; box-sizing: border-box; height: 100%">
      <Catalog :content="note.content" />
      <div class="note-body-header footer-center">
        <div contenteditable="true" class="note-body-title n-title" @input="handleInput" @paste="handlePaste">{{
          note.title
        }}</div>
        <!--        <div>-->
        <!--          <div class="tag-container"> <div class="note-tag">+ 自定义标签</div></div>-->
        <!--        </div>-->
        <TinyMac v-model:value="note.content" style="flex-grow: 1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import TinyMac from '@/view/noteLibrary/TinyMac.vue';
  import { onMounted, reactive, ref, watch } from 'vue';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import router from '@/router';
  import { cloneDeep } from 'lodash-es';
  import { apiBasePost } from '@/http/request.ts';
  import Catalog from '@/view/noteLibrary/components/Catalog.vue';
  const note = reactive({
    id: '',
    title: '未命名文档',
    lastTitle: '未命名文档',
    content: '',
  });
  function handleInput(event) {
    const text = event.target.innerText;
    if (text === '\n' || !text) {
      document.getElementsByClassName('n-title')[0].innerText = note.lastTitle;
      document.getElementsByClassName('n-title')[1].innerText = note.lastTitle;
      note.title = note.lastTitle;
      return;
    }
    if (note.title !== event.target.innerText) {
      note.title = event.target.innerText;
      note.lastTitle = cloneDeep(event.target.innerText);
      saveFunc();
    }
  }
  function handlePaste(event) {
    // 阻止默认的粘贴行为
    event.preventDefault();

    // 获取粘贴的纯文本内容
    const text = event.clipboardData.getData('text/plain');

    // 获取光标位置
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    // 删除当前选中的内容并插入纯文本
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));

    // 调整光标位置
    selection.collapseToEnd();
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
  async function saveNote() {
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
      }
      setTimeout(() => {
        isStartEdit.value = false;
        timer.value = null;
        setUpdateTime();
        clearTimeout(timer.value);
      }, 500);
    }
  }
  const timer = ref(null);
  function saveFunc() {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
      saveNote();
    }, 500);
  }

  onMounted(() => {
    document.documentElement.setAttribute('data-theme', 'day');
    if (router.currentRoute.value.params.value !== 'add') {
      apiBasePost('/api/note/getNoteDetail', {
        id: router.currentRoute.value.params.value,
      })
        .then((res) => {
          if (res.status === 200) {
            Object.assign(note, res.data);
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
</script>

<style lang="less">
  .note-header {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 60px;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: var(--background-color);
    border-bottom: 1px solid #ccc;
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
  .note-body-title {
    height: 50px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    border-radius: 6px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid transparent;
    transition: border-color 0.1s linear;
    font-size: 25px;
    font-weight: 600;
    &:empty:before {
      color: #aaa;
      content: '请输入标题';
    }
  }
  .back-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    cursor: pointer;
    border: 1px solid #edeef5;
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
</style>
