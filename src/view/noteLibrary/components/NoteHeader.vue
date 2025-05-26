<template>
  <div class="note-header">
    <div style="display: flex; align-items: center" :style="{ gap: bookmark.isPhone ? '0' : '20px' }">
      <div class="back-icon" @click="back">
        <SvgIcon :src="icon.noteDetail.back" />
      </div>
      <div
        v-if="!bookmark.isPhone"
        class="note-header-title n-title"
        :contenteditable="!readonly"
        id="note-header-title"
        @focusout="$emit('focusout')"
      >
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
        @click="updateTag"
        title="更新标签"
        v-click-log="{ module: '笔记详情', operation: '更新标签' }"
      >
        <SvgIcon :src="icon.manage_categoryBtn_tag" />
      </div>
      <div
        class="note-header-title-icon"
        @click="$emit('del')"
        title="删除"
        v-click-log="{ module: '笔记详情', operation: '删除笔记' }"
      >
        <SvgIcon :src="icon.noteDetail.delete" />
      </div>
      <div
        v-if="!bookmark.isPhone"
        class="note-header-title-icon"
        @click="$emit('save')"
        title="保存"
        v-click-log="{ module: '笔记详情', operation: '保存笔记' }"
      >
        <SvgIcon :src="icon.noteDetail.save" />
      </div>
    </div>
    <NoteTagConfig v-model:visible="tagConfDlgVisible" v-if="tagConfDlgVisible" @saveTag="$emit('saveTag')" />
  </div>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { bookmarkStore } from '@/store';
  import router from '@/router';
  import { ref } from 'vue';
  import BModal from '@/components/BasicComponents/BModal/BModal.vue';
  import NoteTagConfig from '@/view/noteLibrary/components/NoteTagConfig.vue';

  const props = withDefaults(
    defineProps<{ updateTime: string; nodeType: 'edit' | 'add' | 'share'; readonly: boolean; isStartEdit: boolean }>(),
    {},
  );

  const bookmark = bookmarkStore();

  function back() {
    if (props.nodeType === 'add') {
      router.push('/noteLibrary');
    } else if (props.nodeType === 'share') {
      router.push('/home');
    } else {
      router.back();
    }
  }
  const tagConfDlgVisible = ref(false);
  function updateTag() {
    tagConfDlgVisible.value = true;
  }
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
</style>
