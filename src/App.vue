<template>
  <div id="app" style="height: 100vh; width: 100vw">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#4e4b46',
        },
      }"
    >
      <router-view />
      <login v-if="bookmark.isShowLogin" />
      <BViewer />
    </a-config-provider>
  </div>
</template>
<script setup>
  // 检查本地存储中是否有用户数据
  import userApi from '@/api/userApi';
  import router from '@/router';
  import { bookmarkStore, useUserStore } from '@/store';
  import { nextTick, watch } from 'vue';
  import login from '@/view/login/index.vue';
  import BViewer from '@/components/Viewer/BViewer.vue';
  import { apiBaseGet, apiBasePost } from '@/http/request';

  const user = useUserStore();
  const bookmark = bookmarkStore();
  if (!localStorage.getItem('userId')) {
    bookmark.isShowLogin = true;
  }
  try {
    apiBaseGet('/api/user/getUserInfo', { id: localStorage.getItem('userId') })
      .then((res) => {
        if (res.status === 200) {
          user.setUserInfo(res.data);
          bookmark.theme = res.data.theme || 'day';
          getThemeStyle(res.data.theme);
          localStorage.setItem('theme', res.data.theme);
        } else {
          bookmark.isShowLogin = true;
        }
      })
      .catch((e) => {
        console.error('接口错误：', e);
        router.push('/home');
      });
  } catch (e) {
    router.push('/home');
  }
  // 页面加载前需要提前预设置主题，否则如果后台查询是黑夜主题，但是页面默认是白色的，页面会从白到黑闪一下，这种情况就需要提前设置为黑色
  const theme = localStorage.getItem('theme');
  if (theme) {
    bookmark.theme = theme;
  }
  function getThemeStyle(theme) {
    console.log('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  watch(
    () => bookmark.theme,
    (val) => {
      getThemeStyle(val);
    },
  );

  watch(
    () => bookmark.isPhone,
    (val) => {
      routerChange();
      setTransition(val);
    },
  );

  // 设置动画
  function setTransition(val) {
    nextTick(() => {
      const body = document.getElementById('phone-navigation-container');
      const filter = document.getElementById('phone-filter-panel');
      if (body && filter) {
        if (val) {
          filter.style.transition = 'none';
          filter.style.transform = 'translateX(-100%)';
        } else {
          body.style.transform = 'translateX(0)';
          body.style.transition = 'unset';
          filter.style.transform = 'translateX(0)';
          filter.style.transition = 'unset';
          bookmark.isFold = true;
        }
      }
    });
  }

  // 手机端路由和电脑端不一样，切换视图后需要切换对应路由地址
  function routerChange() {
    if (['/apiLog', '/userMg', '/userOperation', '/operationLog'].includes(router.currentRoute.value.path)) {
      router.push('/admin' + router.currentRoute.value.path);
    }
    if (
      ['/admin/apiLog', '/admin/userMg', '/admin/userOperation', '/admin/operationLog'].includes(
        router.currentRoute.value.path,
      )
    ) {
      router.push(router.currentRoute.value.path.replace('/admin', ''));
    }
  }
</script>
<style></style>
