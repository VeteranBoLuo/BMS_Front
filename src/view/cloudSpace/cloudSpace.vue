<template>
  <CommonContainer title="云空间">
    <div class="cloud-container">
      <div class="header">
        <b-input
          v-if="bookmark.isMobile"
          v-model:value="cloud.searchFileName"
          placeholder="文件名"
          class="header-input"
          @enter="cloud.queryFieldList"
        >
          <template #suffix>
            <svg-icon class="dom-hover" :src="icon.navigation.search" size="16" @click="cloud.queryFieldList" />
          </template>
        </b-input>
        <div v-else class="flex-align-center">
          <div style="font-weight: 500; font-size: 20px" @click="init" class="dom-hover">云空间</div>
          <div class="search-icon">
            <b-input @input="inputQueryFieldList" v-model:value="cloud.searchFileName" placeholder="文件名">
              <template #suffix>
                <svg-icon class="dom-hover" :src="icon.navigation.search" size="16" @click="cloud.queryFieldList" />
              </template>
            </b-input>
          </div>
          <FileTypeFilter />
        </div>
        <HandleBtnGroup />
      </div>
      <div class="content-area">
        <CloudFolder />
        <div class="field-list">
          <div class="field-header">
            <div class="flex-align-center-gap" :style="{ width: bookmark.isMobile ? '80%' : '70%' }"> 文件名 </div>
            <div class="default-area"
              ><div> 文件大小 </div>
              <div v-if="!bookmark.isMobile"> 存储时间 </div>
            </div>
          </div>
          <div class="file-container">
            <div class="field-item" v-for="(item, index) in cloud.fileList" :key="index">
              <div
                style="width: 70%; position: relative"
                class="flex-align-center"
                :style="{ width: bookmark.isMobile ? '80%' : '70%' }"
              >
                <span class="file-label">{{ item.fileName }}</span>
                <div class="flex-align-center handle-btn">
                  <a-tooltip title="下载">
                    <svg-icon
                      class="download-icon"
                      :src="icon.cloudSpace.download"
                      size="20"
                      @click="downloadField(item.id)"
                    />
                  </a-tooltip>
                  <a-popconfirm
                    title="确认删除此文件？"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="handleDelFile(item.id)"
                  >
                    <a-tooltip title="删除">
                      <svg-icon class="download-icon" :src="icon.noteDetail.delete" size="20"></svg-icon>
                    </a-tooltip>
                  </a-popconfirm>
                  <a-tooltip title="移动文件">
                    <svg-icon
                      class="download-icon"
                      :src="icon.cloudSpace.moveFile"
                      size="20"
                      @click="moveField(item.id)"
                    />
                  </a-tooltip>
                </div>
              </div>
              <div class="default-area">
                <div>{{ Number(item.fileSize / 1024).toFixed() }} KB</div>
                <div v-if="!bookmark.isMobile">{{ item.uploadTime }} </div>
              </div>
            </div>
          </div>
          <b-loading :loading="cloud.loading" class="both-center" />
        </div>
      </div>
    </div>
    <MoveFile v-model:visible="moveCfg.moveFileVisible" :fileId="moveCfg.fileId" />
  </CommonContainer>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import { reactive, ref } from 'vue';
  import { deleteField, downloadField } from '@/http/common.ts';
  import { bookmarkStore, cloudSpaceStore } from '@/store';
  import HandleBtnGroup from '@/components/cloudSpace/HandleBtnGroup.vue';
  import SvgIcon from '@/components/base/SvgIcon/src/SvgIcon.vue';
  import CloudFolder from '@/components/cloudSpace/CloudFolder.vue';
  import FileTypeFilter from '@/components/cloudSpace/FileTypeFilter.vue';
  import { debounce } from '@/utils/common.ts';
  import MoveFile from '@/components/cloudSpace/MoveFile.vue';

  const bookmark = bookmarkStore();
  const cloud = cloudSpaceStore();
  const loading = ref(false);


  const inputQueryFieldList = debounce(cloud.queryFieldList, 500);
  function init() {
    cloud.searchFileName = '';
    cloud.queryFieldList();
  }

  function handleDelFile(id) {
    deleteField(id).then(() => {
      cloud.queryFieldList();
    });
  }
  const moveCfg = reactive({
    moveFileVisible: false,
    fileId: '',
  });
  function moveField(id) {
    moveCfg.moveFileVisible = true;
    moveCfg.fileId = id;
  }

  init();
</script>

<style lang="less" scoped>
  .cloud-container {
    padding: 20px 20px 0 20px;
    width: 100%;
    height: 100%;
    border-top: 1px solid var(--notePage-topBody-border-color);
    box-sizing: border-box;
    display: flex;
    gap: 10px;
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
    height: calc(100% - 42px);
    overflow: hidden;
    display: flex;
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
    height: 20px;
    padding: 0 20px 10px 20px;
    border-bottom: 1px solid var(--folder-list-border-color);
  }
  .file-container {
    height: calc(100% - 40px);
    overflow-y: auto;
  }
  .field-item {
    height: 64px;
    padding: 0 20px;
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
      opacity: 0;
      position: absolute;
      right: 20px;
      gap: 10px;
      div {
        cursor: pointer;
      }
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
  .search-icon {
    height: 32px;
    width: 200px;
    margin-left: 250px;
    border-color: var(--card-border-color) !important;
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
    .file-label{
      width: 150px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
