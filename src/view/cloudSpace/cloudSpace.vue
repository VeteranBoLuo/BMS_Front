<template>
  <div class="cloud-container">
    <div class="header">
      <b-input v-model:value="searchValue" placeholder="文件名" class="header-input">
        <template #prefix>
          <svg-icon :src="icon.navigation.search" size="16" />
        </template>
      </b-input>
      <b-space>
        <b-upload class="upload-btn" @change="handleChange" :max-total-size="50 * 1024 * 1024">
          <b-button>上传文件</b-button>
        </b-upload>
        <b-button @click="handleAddFolder">新建文件夹</b-button>
      </b-space>
    </div>
    <div class="content-area">
      <div class="folder-list">
        <b-list v-model:listOptions="folderList" :node-type="{ id: 'id', title: 'name' }" @nodeClick="folderClick">
          <template #icon>
            <svg-icon size="16" :src="icon.common.folder" />
          </template>
        </b-list>
      </div>
      <div class="field-list">
        <div class="field-header">
          <div class="flex-align-center-gap" style="width: 80%"> <b-checkbox /> 文件名 </div>
          <div class="default-area"><div> 文件大小 </div> <div> 存储时间 </div></div>
        </div>
        <div class="field-item" v-for="(item, index) in filedList" :key="index">
          <div style="width: 80%; position: relative" class="flex-align-center">
            <span>{{ item.fileName }}</span>
            <svg-icon class="download-icon" :src="icon.cloudSpace.download" size="20" @click="downloadField(item.id)" />
          </div>
          <div class="default-area">
            <div>{{ Number(item.fileSize / 1000).toFixed() }} KB</div>
            <div>{{ item.uploadTime }} </div>
          </div>
        </div>
        <b-loading :loading="loading" class="both-center" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { apiBasePost } from '@/http/request.ts';
  import icon from '@/config/icon.ts';
  import { ref } from 'vue';
  import BList from '@/components/base/BasicComponents/BList.vue';
  import { downloadField } from '@/http/common.ts';

  const searchValue = ref();
  const folderList = ref([{ id: 'all', name: '全部文件' }]);
  const loading = ref(false);
  function folderClick(folder) {
    if (folder.id === 'all') {
      queryFieldList();
    }
  }

  const filedList = ref([]);

  function queryFieldList() {
    loading.value = true;
    apiBasePost('/api/file/queryFiles')
      .then((res) => {
        filedList.value = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function handleChange(e) {
    let fileData;
    let file = e[0]; // 假设这里的e[0]是你的文件或者Base64字符串
    // 检查是否为Base64字符串（这里假设Base64字符串都是"data:image"开头）
    if (file.isImg) {
      file = file.file;
      // 提取Base64字符串部分并转换为Blob
      const base64String = file.split(';base64,').pop();
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
    if (e[0].isImg) {
      formData.append('file', fileData, e[0].fileName); // 确保文件名正确
    } else {
      formData.append('file', fileData);
    }

    apiBasePost('/api/file/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      if (res.status === 200) {
        queryFieldList();
      }
    });
  }
  function handleAddFolder() {}

  queryFieldList();
</script>

<style lang="less" scoped>
  .cloud-container {
    padding: 20px;
    width: 100%;
    height: 100%;
    border-top: 1px solid var(--notePage-topBody-border-color);
    box-sizing: border-box;
    display: flex;
    gap: 20px;
    flex-direction: column;
  }
  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-input {
      width: 300px;
    }
  }
  .content-area {
    flex: 1;
    display: flex;
    .folder-list {
      height: 100%;
      width: 300px;
      border-right: 1px solid var(--folder-list-border-color);
    }
    .field-list {
      width: 100%;
      position: relative;
    }
  }
  .field-header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--folder-list-border-color);
  }
  .field-item {
    height: 64px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--folder-list-border-color);
    transition: background-color 0.3s;
    &:hover {
      background-color: var(--bl-input-noBorder-bg-color);
      .download-icon {
        opacity: 1;
      }
    }
    .download-icon {
      opacity: 0;
      position: absolute;
      right: 20px;
      cursor: pointer;
      color: var(--desc-color);
    }
  }
  .default-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    font-size: 14px;
    color: var(--desc-color);
  }
</style>
