<template>
  <div :class="['navigation', { 'navigation-manage': pagePath === '/manage' }]">
    <!--  移动端搜索        -->
    <div v-if="bookmark.isPhone" id="phone-navigation-search" class="phone-navigation-search">
      <b-input
        v-model:value="bookmark.bookmarkSearch"
        class="phoneSearch"
        id="navigation-phone-input"
        placeholder="可根据网站名称、描述搜索"
        @focusout="searchBackClick"
        @input="handleSearch"
      />
      <span class="search-back-span flex-center" @click="searchBackClick">返回</span>
    </div>
    <div id="phone-navigation-container" class="flex-align-center">
      <div class="navigation-title">
        <svg-icon
          :src="icon.navigation_menu"
          size="25"
          v-if="
            bookmark.isPhone &&
            router.currentRoute.value.fullPath.includes('home') &&
            bookmark.isFold
          "
          @click="foldClick"
        />
        <svg-icon
          :src="icon.navigation_close"
          size="25"
          v-if="
            bookmark.isPhone &&
            router.currentRoute.value.fullPath.includes('home') &&
            !bookmark.isFold
          "
          @click="foldClick"
        />
        <template class="navigation-title-link" @click="handleToIndex">
          <img src="../../../assets/icons/bookmark.svg" title="首页" width="25" height="25" />
          <span>BMS</span>
        </template>
      </div>
      <div class="navigation-body">
        <div class="navigation-search-input" v-if="searchInputVisible">
          <b-input
            id="bookmark-input"
            :placeholder="placeholder"
            @input="handleSearch"
            @focus="placeholder = '可根据网站名称、描述搜索'"
            @focusout="placeholder = 'Search...'"
            v-model:value="bookmark.bookmarkSearch"
          >
            <template #prefix>
              <svg-icon :src="icon.navigation_search" size="16" />
            </template>
            <template #suffix>
              <div>/</div>
            </template>
          </b-input>
        </div>
        <div style="position: absolute; right: 25px; display: flex; align-items: center; gap: 15px">
          <div v-if="phoneSearchVisible" class="flex-align-center icon-hover">
            <svg-icon size="30" :src="icon.navigation_phone_search" @click="phoneSearchClick" />
          </div>
          <!--  主题切换        -->
          <ThemeSwith />
          <!--用户信息          -->
          <HeaderMenu />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import { computed, onMounted, ref, watch } from 'vue';
  import Alert from '@/components/BasicComponents/BModal/Alert';
  import router from '@/router';
  import { bookmarkStore, domStore, useUserStore } from '@/store';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import icon from '@/config/icon.ts';
  import ThemeSwith from '@/components/tag/ThemeSwith.vue';
  import HeaderMenu from '@/view/tag/components/HeaderMenu.vue';

  const placeholder = ref('Search...');

  document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('focus', function () {
      console.log('输入框获得了焦点！');
      // 这里可以添加其他你希望在输入框聚焦时执行的代码
    });

    searchInput.addEventListener('blur', function () {
      console.log('输入框失去了焦点！');
      // 这里可以添加其他你希望在输入框失去焦点时执行的代码
    });
  });

  const searchInputVisible = computed(() => {
    return !bookmark.isPhone && router.currentRoute.value.path.includes('home');
  });
  const phoneSearchVisible = computed(() => {
    return bookmark.isPhone && router.currentRoute.value.path.includes('home') && bookmark.isFold;
  });

  const bookmark = bookmarkStore();
  const dom = domStore();

  async function handleToIndex() {
    await router.push({ path: `/` });
    if (bookmark.isPhone) {
      location.reload();
    } else {
      bookmark.type = 'all';
      bookmark.refreshData();
      const viewPanel = document.getElementById('view-panel');
      if (viewPanel) {
        viewPanel.scrollTop = 0;
      }
    }
  }

  function foldClick() {
    bookmark.isFold = !bookmark.isFold;
    const body: any = document.getElementById('phone-filter-panel');
    if (bookmark.isPhone) {
      body.style.transition = 'all 0.3s';
    } else {
      body.style.transition = 'none';
    }
    if (bookmark.isFold) {
      body.style.transform = 'translateX(-100%)';
    } else {
      body.style.transform = 'translateX(0)';
    }
  }

  watch(
    () => bookmark.type,
    (val) => {
      if (val !== 'search') {
        bookmark.bookmarkSearch = '';
      }
    },
  );

  const timer = ref();

  function handleSearch() {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
      if (bookmark.bookmarkSearch) {
        bookmark.type = 'search';
        router.push({ path: `/home/search/${bookmark.bookmarkSearch}` });
      } else {
        router.push({ path: '/' });
      }
      bookmark.refreshData();
    }, 500);
  }

  function phoneSearchClick() {
    const search: any = document.getElementById('phone-navigation-search');
    search.style.transform = ' translateX(20px)';
    const body: any = document.getElementById('phone-navigation-container');
    body.style.transform = ' translateX(100%)';
    document.getElementById('navigation-phone-input').focus();
  }

  function searchBackClick() {
    const search: any = document.getElementById('phone-navigation-search');
    search.style.transform = ' translateX(calc(-100%))';
    const body: any = document.getElementById('phone-navigation-container');
    body.style.transform = ' translateX(0)';
  }

  const pagePath = computed(() => {
    return router.currentRoute.value.path;
  });
  onMounted(() => {
    document.addEventListener('keydown', function (event) {
      // 检查按下的键是否是“/”
      if (event.key === '/') {
        // 阻止“/”键的默认行为，例如，防止浏览器打开地址栏搜索
        event.preventDefault();
        // 获取具有指定ID的input元素
        const inputElement = document.getElementById('bookmark-input');
        // 如果元素存在，则聚焦到该元素
        if (inputElement) {
          inputElement.focus();
        }
      }
    });
  });
</script>

<style lang="less" scoped>
  .navigation {
    height: 60px;
    display: flex;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
  }

  .navigation-title {
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 550;
    font-size: 20px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    padding-left: 20px;

    .navigation-title-link {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 100%;
      cursor: pointer;
    }
  }

  .navigation-body {
    width: calc(100% - 240px);
    height: 100%;
    align-items: center;
    display: flex;
  }

  .navigation-search-input {
    margin: auto;
    width: 400px;
  }

  .navigation-icon {
    display: flex;
    align-items: center;
    clip-path: circle(50% at 50% 50%);
    cursor: pointer;
  }

  .header_menu_ul {
    color: black;
    list-style-type: none;
    text-align: center;
    margin: 5px 0 0 0;
    padding: 2px;
    box-sizing: border-box;
    width: 220px;
    li {
      width: 100%;
      height: 30px;
      cursor: pointer;
      font-size: 14px;
      border-radius: 4px;
      background-color: var(--menu-item-bg-color);
      color: var(--text-color);
      margin-bottom: 5px;
      gap: 10px;

      &:hover {
        background-color: var(--menu-item-h-bg-color);
      }
    }
  }
  .user-icon-text {
    text-align: left;
  }

  @media (max-width: 600px) {
    .navigation-title {
      gap: 20px;

      .navigation-title-link {
        gap: 10px;
      }
    }
    .header_menu_ul {
      width: 180px;
    }
  }

  .navigation-manage {
    background-color: #ffffff;
    color: #000000;
  }

  #phone-navigation-container {
    position: absolute;
    width: 100%;
    transition: all 0.3s;
  }

  .phone-navigation-search {
    position: absolute;
    width: calc(100% - 40px);
    transform: translateX(calc(-100%));
    gap: 10px;
    display: flex;
    transition: all 0.3s;

    .search-back-span {
      cursor: pointer;
      width: 60px;
      color: #ff9800;
    }
  }
</style>
