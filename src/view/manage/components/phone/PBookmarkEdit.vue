<template>
  <PhoneContainer :title="(handleType === 'add' ? '新增' : '编辑') + '书签'">
    <b-loading :loading="loading" style='height: unset'>
      <div class="tag-edit-body">
        <div class="tag-attr-item">
          <span class="tag-attr-label">书签名称</span>
          <b-input v-model:value="bookmarkData.name" />
        </div>
        <div class="tag-attr-item">
          <span class="tag-attr-label">网站地址</span>
          <b-input v-model:value="bookmarkData.url" />
        </div>
        <div class="tag-attr-item">
          <span class="tag-attr-label">相关标签</span>
          <a-select
            :listHeight="350"
            mode="multiple"
            :max-tag-count="3"
            :options="tagOptions"
            show-search
            :filter-option="SelectionSearch"
            v-model:value="bookmarkData.relatedTags"
          />
        </div>
        <div class="tag-attr-item">
          <span class="tag-attr-label">描述</span>
          <b-input v-model:value="bookmarkData.description" />
        </div>
      </div>
    </b-loading>
    <b-button
      class="container-footer-btn"
      type="primary"
      @click="submit"
      v-click-log="{ module: '书签编辑', operation: `确定` }"
      >确定</b-button
    >
  </PhoneContainer>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { TagInterface } from '@/config/bookmarkCfg';
  import { apiBasePost, apiQueryPost } from '@/http/request';
  import { useRouter } from 'vue-router';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import { bookmarkStore, useUserStore } from '@/store';
  import BSpace from '@/components/BasicComponents/BSpace/BSpace.vue';
  import { message } from 'ant-design-vue';
  import { SelectionSearch } from '@/components/BasicComponents/BForm/FormRenders.vue';
  import PhoneContainer from '@/components/phoneComponents/PhoneContainer/PhoneContainer.vue';

  const bookmark = bookmarkStore();
  const user = useUserStore();

  const bookmarkData = ref<any>({
    id: '',
    name: '',
    iconUrl: '',
    description: '',
    createTime: '',
    relatedTags: [],
  });

  getAllBookmarkList();
  getTagSelect();
  const mockData = ref<any[]>([]);
  const filterOption = (inputValue: string, option: any) => {
    return option.name.toUpperCase().indexOf(inputValue.toUpperCase()) > -1;
  };

  async function getAllBookmarkList() {
    const allRes = await apiQueryPost('/api/bookmark/getBookmarkList', {
      filters: {
        userId: localStorage.getItem('userId'),
        type: 'all',
      },
    });
    if (allRes.status === 200) {
      mockData.value = allRes.data.items;
    }
  }

  const tagOptions = ref([]);

  async function getTagSelect() {
    const res = await apiQueryPost('/api/bookmark/queryTagList', {
      filters: {
        userId: user.id,
      },
    });
    if (res.status === 200) {
      bookmark.tagList = res.data;
      tagOptions.value = [];
      res.data.forEach((tag) => {
        if (tag.id !== router.currentRoute.value.params.id) {
          tagOptions.value.push({
            label: tag.name,
            value: tag.id,
          });
        }
      });
      return tagOptions.value;
    }
    return [];
  }

  function submit() {
    if (loading.value) {
      message.warning('请等待数据请求完毕');
    }
    let params = JSON.parse(JSON.stringify(bookmarkData.value));
    let url = '/api/bookmark/updateBookmark';
    if (handleType.value === 'add') {
      url = '/api/bookmark/addBookmark';
      params.userId = user.id;
    }
    apiBasePost(url, bookmarkData.value).then((res) => {
      if (res.status === 200) {
        message.success('保存成功');
        router.back();
      }
    });
  }

  const handleType = computed(() => {
    if (router.currentRoute.value.params.id === 'add' || router.currentRoute.value.params.tagId) {
      return 'add';
    }
    return 'edit';
  });

  const router = useRouter();
  const loading = ref(false);
  onMounted(async () => {
    if (handleType.value === 'add') {
      if (router.currentRoute.value.params.tagId) {
        bookmarkData.value.relatedTags = [router.currentRoute.value.params.tagId];
      }
      return;
    }
    loading.value = true;
    // 创建两个Promise，分别对应两个API调用
    const res = await apiQueryPost('/api/bookmark/getBookmarkDetail', {
      filters: {
        id: router.currentRoute.value.params?.id,
      },
    });
    bookmarkData.value = res.data;
    const tagRes = await apiQueryPost('/api/bookmark/getRelatedTag', {
      filters: {
        userId: user.id,
        id: router.currentRoute.value.params?.id,
        type: 'bookmark',
      },
    });
    bookmarkData.value.relatedTags = tagRes.data.map((data) => data.id);
    loading.value = false;
  });
</script>

<style lang="less" scoped>
  .tag-edit-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .tag-attr-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
  }

  .tag-attr-label {
    white-space: nowrap;
  }


  :deep(.ant-transfer-list-header) {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  :deep(.ant-input) {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: none;
  }

  :deep(.ant-select-selector) {
    transition: none !important;
  }

  :deep(.ant-input-affix-wrapper) {
    transition: none;
  }

  :deep(.ant-transfer-list-search) {
    background-color: var(--background-color);
  }

  :deep(.anticon-search) {
    color: var(--text-color) !important;
  }

  :deep(.ant-btn-primary) {
    box-shadow: none;
  }

  :deep(.ant-transfer-list-content-item-text) {
    color: var(--text-color) !important;
  }

  :deep(.ant-spin-container::after) {
    background-color: unset;
  }
  :deep(.ant-btn-icon-only) {
    color: #ccc;
  }
  @media (max-width: 1300px) {
    .tag-attr-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 90%;
    }

    :deep(.ant-checkbox-group) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
    }

    :deep(.ant-checkbox-group-item) {
      color: var(--text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
