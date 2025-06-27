<template>
  <CommonContainer title="云空间">
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
          <b-button v-if="!bookmark.isMobile" @click="handleAddFolder">新建文件夹</b-button>
        </b-space>
      </div>
      <div class="content-area">
        <div class="folder-list" v-if="!bookmark.isMobile">
          <b-list v-model:listOptions="folderList" :node-type="{ id: 'id', title: 'name' }" @nodeClick="folderClick">
            <template #icon>
              <svg-icon size="16" :src="icon.common.folder" />
            </template>
          </b-list>
        </div>
        <div class="field-list">
          <div class="field-header">
            <div class="flex-align-center-gap" :style="{ width: bookmark.isMobile ? '80%' : '70%' }">
              <b-checkbox v-if="!bookmark.isMobile" /> 文件名
            </div>
            <div class="default-area"
              ><div> 文件大小 </div>
              <div v-if="!bookmark.isMobile"> 存储时间 </div>
            </div>
          </div>
          <div class="file-container">
            <div class="field-item" v-for="(item, index) in filedList" :key="index">
              <div
                style="width: 70%; position: relative"
                class="flex-align-center"
                :style="{ width: bookmark.isMobile ? '80%' : '70%' }"
              >
                <span>{{ item.fileName }}</span>
                <div class="flex-align-center handle-btn">
                  <svg-icon
                    title="下载"
                    class="download-icon"
                    :src="icon.cloudSpace.download"
                    size="20"
                    @click="downloadField(item.id)"
                  />
                  <a-popconfirm
                    title="确认删除此文件？"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="handleDelFile(item.id)"
                  >
                    <svg-icon title="删除" class="download-icon" :src="icon.noteDetail.delete" size="20"></svg-icon>
                  </a-popconfirm>
                </div>
              </div>
              <div class="default-area">
                <div>{{ Number(item.fileSize / 1000).toFixed() }} KB</div>
                <div v-if="!bookmark.isMobile">{{ item.uploadTime }} </div>
              </div>
            </div>
          </div>
          <b-loading :loading="loading" class="both-center" />
        </div>
      </div>
    </div>
  </CommonContainer>
</template>

<script lang="ts" setup>
  import { apiBasePost } from '@/http/request.ts';
  import icon from '@/config/icon.ts';
  import { ref } from 'vue';
  import BList from '@/components/base/BasicComponents/BList.vue';
  import { deleteField, downloadField } from '@/http/common.ts';
  import { bookmarkStore } from '@/store';

  const bookmark = bookmarkStore();

  const searchValue = ref();
  const folderList = ref([{ id: 'all', name: '全部文件' }]);
  const loading = ref(false);
  function folderClick(folder) {
    if (folder.id === 'all') {
      queryFieldList();
    }
  }

  const filedList = ref<{ id: string; fileName: string; fileSize: number; uploadTime: string }[]>([]);

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

  function handleDelFile(id) {
    deleteField(id).then((res) => {
      console.log(res);
      queryFieldList();
    });
  }

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
    height: 100%;
    display: flex;
    .folder-list {
      height: 100%;
      width: 300px;
      border-right: 1px solid var(--folder-list-border-color);
    }
    .field-list {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
    }
  }
  .field-header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    padding-left: 20px;
    border-bottom: 1px solid var(--folder-list-border-color);
  }
  .file-container {
    height: calc(100% - 70px);
    padding-right: 20px;
    margin-right: -20px;
    overflow-y: auto;
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
      .handle-btn {
        opacity: 1;
      }
    }
    .handle-btn {
      color: var(--desc-color);
    }
  }
  .handle-btn {
    opacity: 0;
    position: absolute;
    right: 20px;
    gap: 10px;
    div {
      cursor: pointer;
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

  @media (max-width: 1000px) {
    .header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      .header-input {
        flex: 1;
      }
    }
    .file-container {
      height: calc(100% - 20px);
    }
    .handle-btn {
      opacity: 1;
    }
  }
</style>
