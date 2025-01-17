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
  import { useRouter } from 'vue-router';
  const bookmark = bookmarkStore();
  const router = useRouter();

  const watchedId = computed(() => router.currentRoute.value.params?.id);
  const watchedRefreshKey = computed(() => bookmark.refreshKey);
  watch(
    () => [watchedId, watchedRefreshKey],
    async () => {
      if (bookmark.type === 'normal') {
        const tag = bookmark.tagList?.find((item) => item.id === router.currentRoute.value.params?.id);
        bookmark.tagData = tag;
        if (tag) {
          const userId = localStorage.getItem('userId');
          const tagId = tag.id;
          const normalRes = await apiQueryPost('/api/bookmark/getBookmarkList', {
            filters: {
              userId,
              tagId,
              type: 'normal',
            },
          });
          if (normalRes.status === 200) {
            bookmark.bookmarkList = normalRes.data.items;
          }
          if (bookmark.isPhone) {
            bookmark.isFold = true;
          }
        }
        const dom = document.getElementById('view-panel');
        dom.scrollTop = 0;
      } else if (bookmark.type === 'all') {
        bookmark.tagData = null;
        const allRes = await apiQueryPost('/api/bookmark/getBookmarkList', {
          filters: {
            userId: localStorage.getItem('userId'),
            type: 'all',
          },
        });
        if (allRes.status === 200) {
          bookmark.bookmarkList = allRes.data.items;
          bookmark.tagData = null;
        }
      } else {
        bookmark.tagData = null;
        if (bookmark.bookmarkSearch) {
          const searchRes = await apiQueryPost('/api/bookmark/getBookmarkList', {
            filters: {
              type: 'search',
              userId: localStorage.getItem('userId'),
              value: bookmark.bookmarkSearch,
            },
          });
          if (searchRes.status === 200) {
            bookmark.bookmarkList = searchRes.data.items;
          }
        } else {
          bookmark.type = 'all';
          bookmark.refreshData();
        }
      }

      // 缓存图片
      await apiBasePost(
        '/api/common/analyzeImgUrl',
        bookmark.bookmarkList?.map((data: any) => {
          return {
            url: data.url,
            id: data.id,
            noCache: !data.iconUrl,
          };
        }),
      );
    },
    {
      deep: true,
    },
  );

  watch(
    () => bookmark.refreshTagKey,
    () => {
      queryTagList();
    },
  );

  function queryTagList() {
    apiQueryPost('/api/bookmark/queryTagList', {
      filters: {
        userId: localStorage.getItem('userId'),
      },
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
    if (router.currentRoute.value.params?.id) {
      bookmark.type = 'normal';
    } else if (router.currentRoute.value.params?.value) {
      // 带有search刷新页面时
      bookmark.type = 'search';
      bookmark.bookmarkSearch = router.currentRoute.value.params.value;
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