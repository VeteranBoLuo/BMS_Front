<template>
  <b-space :size="15">
    <CloudStorageBar v-if="!bookmark.isMobile" />
    <b-upload class="upload-btn" @change="handleChange" :max-total-size="50 * 1024 * 1024">
      <b-button type="primary">上传文件</b-button>
    </b-upload>
  </b-space>
</template>

<script lang="ts" setup>
  import CloudStorageBar from '@/components/cloudSpace/CloudStorageBar.vue';
  import { bookmarkStore, cloudSpaceStore } from '@/store';
  import { apiBasePost } from '@/http/request.ts';
  import { message } from 'ant-design-vue';

  const bookmark = bookmarkStore();
  const cloud = cloudSpaceStore();
  const emit = defineEmits(['addFolder']);
  function handleChange(e) {
    let fileData;
    let file = e[0]; // 假设这里的e[0]是你的文件或者Base64字符串
    // 检查是否为Base64字符串（这里假设Base64字符串都是"data:image"开头）
    if (file.isImg) {
      // 提取Base64字符串部分并转换为Blob
      const base64String = file.file.split(';base64,').pop();
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      fileData = new Blob([byteArray], { type: 'image/svg+xml' }); // 根据实际情况调整MIME类型
    } else {
      // 如果不是Base64字符串，则直接使用原始文件
      fileData = file;
    }
    const formData = new FormData();
    if (file.isImg) {
      formData.append('file', fileData, file.fileName); // 确保文件名正确
    } else {
      formData.append('file', fileData);
    }

    const uploadAfterSize: any = Number(file.size / 1024 / 1024 + cloud.usedSpace).toFixed(2);
    if (uploadAfterSize <= cloud.maxSpace) {
      apiBasePost('/api/file/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        if (res.status === 200) {
          message.success('上传成功');
          cloud.queryFieldList();
        }
      });
    } else {
      message.warning('剩余空间不足');
    }
  }

  function handleAddFolder() {
    emit('addFolder');
  }
</script>

<style lang="less" scoped></style>
