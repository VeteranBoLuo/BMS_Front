<template>
  <div class="main-page">
    <FilterPanel id="phone-filter-panel" class="phone-filter-panel" />
    <ViewPanel :key="bookmark.mainPanelKey" />
  </div>
</template>

<script lang="ts" setup>
  import FilterPanel from '@/view/tag/components/FilterPanel.vue';
  import ViewPanel from '@/view/tag/components/ViewPanel.vue';
  import { computed, onMounted, watch } from 'vue';
  import { bookmarkStore, useUserStore } from '@/store';
  import { apiBasePost, apiQueryPost } from '@/http/request';
  import { useRoute, useRouter } from 'vue-router'

  const bookmark = bookmarkStore();
  const router = useRouter();
  const roure = useRoute();

  // 处理滚动条滚动到顶部
  const scrollToTop = () => {
    const dom = document.getElementById('view-panel');
    dom?.scrollTo(0, 0);
  };

  // 获取书签列表
  const fetchBookmarkList = async (type: string, params?: Record<string, any>) => {
    const res = await apiQueryPost('/api/bookmark/getBookmarkList', {
      filters: {
        userId,
        type,
        ...params,
      },
    });
    if (res.status === 200) {
      bookmark.bookmarkList = res.data.items;
    }
  };

  // 缓存图片
  const cacheImages = async () => {
    if (bookmark.bookmarkList) {
      await apiBasePost(
        '/api/common/analyzeImgUrl',
        bookmark.bookmarkList?.map((data: any) => ({
          url: data.url,
          id: data.id,
          noCache: !data.iconUrl,
        })),
      );
    }
  };

  const watchedId = computed(() => roure.params?.id);
  const watchedRefreshKey = computed(() => bookmark.refreshKey);
  watch(
    () => [watchedId.value, watchedRefreshKey.value],
    async () => {
      if (bookmark.type === 'normal') {
        const tag = bookmark.tagList?.find((item) => item.id === roure.params?.id);
        bookmark.tagData = tag;
        if (tag) {
          await fetchBookmarkList('normal', { tagId: tag.id });
          if (bookmark.isPhone) {
            bookmark.isFold = true;
          }
        }
      } else if (bookmark.type === 'all') {
        bookmark.tagData = null;
        await fetchBookmarkList('all');
      } else if (bookmark.type === 'search' && bookmark.bookmarkSearch) {
        bookmark.tagData = null;
        await fetchBookmarkList('search', { value: bookmark.bookmarkSearch });
      } else {
        bookmark.tagData = null;
        bookmark.type = 'all';
        bookmark.refreshData();
      }
      scrollToTop();
      await cacheImages();
    },
    {
      deep: true,
    },
  );

  watch(() => bookmark.refreshTagKey, queryTagList);

  function queryTagList() {
    apiQueryPost('/api/bookmark/queryTagList', {
      filters: { userId },
    }).then((res) => {
      if (res.status === 200) {
        bookmark.tagList = res.data;
        bookmark.refreshData();
      }
    });
  }

  watch(
    () => bookmark.isFold,
    (val) => {
      const filter: any = document.getElementById('phone-filter-panel');
      if (bookmark.isPhone) {
        filter.style.transition = 'all 0.3s';
        if (val) {
          filter.style.transform = 'translateX(-100%)';
        } else {
          filter.style.transform = 'translateX(0)';
        }
      }
    },
  );

  const user = useUserStore();
  const userId = localStorage?.getItem('userId');
  onMounted(() => {
    if (!userId) {
      user.role = 'visitor';
    }
    bookmark.type = 'all';
    // 带有tagId刷新页面时
    if (roure.params?.id) {
      bookmark.type = 'normal';
    } else if (roure.params?.value) {
      // 带有search刷新页面时
      bookmark.type = 'search';
      bookmark.bookmarkSearch = roure.params.value;
    }
    queryTagList();
  });
</script>

<style lang="less">
  .main-page {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
  }
  @media (max-width: 600px) {
    .main-page {
      padding: 20px 0;
      display: flex;
    }
    .phone-filter-panel {
      box-sizing: border-box;
      width: 100%;
      background-color: var(--background-color);
      z-index: 10;
      position: absolute;
      transform: translateX(-100%);
    }
  }
</style>
