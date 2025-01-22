<template>
  <div style="width: 100%; border-top: 1px solid #e0e0e0">
    <div class="note-header">
      <div contenteditable="true" class="note-title">文档示例</div>
      <div style="color: #c0c0c0; font-size: 12px"> 最近修改 2025/1/22 10:36:52 </div>
      <div style="color: #c0c0c0; font-size: 12px">
        <span v-if="true">保存中...</span>
        <span v-else>文档已实时保存</span>
      </div>
    </div>
    <TinyMac v-model:value="value" style="height: calc(100% - 44px)" />
  </div>
</template>

<script lang="ts" setup>
  import TinyMac from '@/view/noteLibrary/TinyMac.vue';
  import { ref, watch } from 'vue';
  const value = ref('');

  watch(
    () => value.value,
    (newVal) => {
      console.log(newVal);
    },
  );
</script>

<style lang="less">
  .note-header {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 44px;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: var(--background-color);
  }
  .note-title {
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    border-radius: 6px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid transparent;
    &:hover {
      border-color: rgba(0, 0, 0, 0.1) !important;
    }
    &:focus {
      border-color: #257bf1 !important;
    }
  }
</style>
