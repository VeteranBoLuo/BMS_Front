<template>
  <div @click="handleUpload" style="width: max-content">
    <slot name="default">
      <div class="upload_class">
        <span>上传文件</span>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';

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
    input.addEventListener('change', function (event: any) {
      const file = event.target.files[0]; // 获取用户选择的文件
      if (file) {
        // 检查文件大小是否超过5M
        const maxFileSize = 5000 * 1024;
        if (file.size > maxFileSize) {
          message.warning('图片大小不能超过5MB');
          return; // 如果文件过大，终止函数执行
        }
        const reader = new FileReader(); // 创建FileReader对象
        reader.onload = function (e) {
          const base64 = e.target.result; // 直接获取Base64编码的字符串
          emit('change', base64.toString());
        };
        reader.onerror = function (error) {
          console.error('Error reading file:', error);
        };
        reader.readAsDataURL(file); // 读取文件内容，结果为Base64编码的字符串
      }
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
    }
  }
</style>
