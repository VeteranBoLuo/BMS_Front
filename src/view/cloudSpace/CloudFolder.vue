<template>
  <div class="folder-list" v-if="!bookmark.isMobile">
    <div
      class="category-item"
      style="margin: 0 0 5px 0"
      :style="{
        backgroundColor: 'all' === currentFolder.id ? 'var(--category-item-ba-color)' : '',
      }"
      @click="clickAllFolder"
    >
      <svg-icon size="16" :src="icon.common.folder" />
      <span class="text-hidden" style="width: calc(100% - 28px)">全部文件</span>
    </div>
    <b-list
      style="height: calc(100% - 80px)"
      v-model:listOptions="cloud.folderList"
      :node-type="{ id: 'id', title: 'name' }"
      @nodeClick="folderClick"
    >
      <template #item="{ item }">
        <RightMenu :menu="['上传文件', '重命名', '删除']" v-if="!item.isRename" @select="handleTagMenu($event, item)">
          <div
            class="category-item"
            :title="item.name"
            :style="{
              backgroundColor: currentFolder.id === item.id ? 'var(--category-item-ba-color)' : '',
            }"
            :key="item"
            v-click-log="{ module: '云空间', operation: `查询文件夹【${item.name}】下的文件列表` }"
            @click="folderClick(item)"
          >
            <svg-icon size="16" :src="icon.common.folder" />
            <span class="text-hidden" style="width: calc(100% - 28px)">{{ item['name'] }}</span>
          </div>
        </RightMenu>
        <b-input v-else class="edit-input" v-model:value="newName" @click.stop>
          <template #suffix>
            <svg-icon :src="icon.filterPanel.check" size="18" class="dom-hover" @click="handleRename(item)" />
          </template>
        </b-input>
      </template>
    </b-list>
    <b-button v-if="!bookmark.isMobile" @click="addFolder" style="width: 100%">新建文件夹</b-button>
  </div>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import BList from '@/components/base/BasicComponents/BList.vue';
  import RightMenu from '@/components/base/RightMenu.vue';
  import SvgIcon from '@/components/base/SvgIcon/src/SvgIcon.vue';
  import { bookmarkStore, cloudSpaceStore } from '@/store';
  import { ref } from 'vue';
  import { recordOperation } from '@/api/commonApi.ts';
  import { message } from 'ant-design-vue';
  import { apiBasePost, apiQueryPost } from '@/http/request.ts';

  const bookmark = bookmarkStore();
  const cloud = cloudSpaceStore();
  const emit = defineEmits(['queryFieldList']);

  const currentFolder = ref({
    name: '全部文件',
    id: 'all',
  });

  function clickAllFolder() {
    currentFolder.value = {
      name: '全部文件',
      id: 'all',
    };
    emit('queryFieldList');
  }

  function folderClick(folder) {
    currentFolder.value = folder;
  }

  const newName = ref('');
  function handleTagMenu(menu, folder: any) {
    recordOperation({ module: '云科技', operation: `右键${menu}文件夹${folder.name}` });
    const actions = {
      重命名: () => {
        folder.isRename = true;
        newName.value = folder.name;
      },
      删除: () => {},
      上传文件: () => {},
    };
    actions[menu]?.();
  }

  function addFolder() {
    cloud.folderList.push({ name: '', isRename: true });
  }

  function handleRename(folder: any) {
    if (newName.value) {
      folder.isRename = !folder.isRename;
      folder.name = newName.value;
      if (folder.id) {
        message.success('重命名成功');
      } else {
        apiBasePost('/api/common/addFolder', folder).then((res) => {
          if (res.status === 200) {
            cloud.queryFolder();
            message.success('新增文件夹成功');
          }
        });
      }
    }
  }

  cloud.queryFolder();
</script>

<style lang="less" scoped>
  .folder-list {
    height: 100%;
    width: 300px;
    border-right: 1px solid var(--folder-list-border-color);
    padding-right: 10px;
  }
</style>
