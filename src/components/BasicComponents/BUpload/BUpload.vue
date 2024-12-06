<template>
  <div class="upload_class" @click="handleUpload">
    <slot name="default">
      <span>上传文件</span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['change']);
  const props = withDefaults(
    defineProps<{
      accept: string;
    }>(),
    {
      accept: '*',
    },
  );
  function handleUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = props.accept;
    input.addEventListener('change', function (event) {
      emit('change', event);
    });
    // 添加到文档并触发点击
    input.click();
  }
</script>

<style lang="less" scoped>
  .upload_class {
    height: 30px;
    line-height: 30px;
    width: max-content;
    padding: 0 5px;
    display: flex;
    border-radius: 8px;
    border: 1px solid #ccc;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      border: 1px solid var(--primary-color);
    }
  }
</style>
