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
  import { bookmarkStore, useUserStore } from '@/store';
  import { nextTick, watch } from 'vue';
  import login from '@/view/login/index.vue';
  import BViewer from '@/components/Viewer/BViewer.vue';
  import { apiBaseGet } from '@/http/request';
  import { useRouter } from 'vue-router';
  import { fingerprint } from '@/utils/common';

  const router = useRouter();
  const user = useUserStore();
  const bookmark = bookmarkStore();

  if (!localStorage.getItem('userId')) {
    bookmark.isShowLogin = true;
  }
  // 页面加载前需要提前预设置主题，否则如果后台查询是黑夜主题，但是页面默认是白色的，页面会从白到黑闪一下，这种情况就需要提前设置为黑色
  const theme = localStorage.getItem('theme');
  if (theme) {
    bookmark.theme = theme;
  }
  window.fingerprint = fingerprint();
  getUserInfo();
  function getThemeStyle(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  watch(
    () => bookmark.theme,
    (val) => {
      getThemeStyle(val);
    },
    {
      immediate: true,
    },
  );

  watch(
    () => bookmark.isPhone,
    (val) => {
      routerChange(val, router.currentRoute.value.path);
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

  // 手机端路由和电脑端不一样，切换不同尺寸设备后需要切换对应路由地址
  function routerChange(isPhone, path) {
    if (isPhone) {
      if (['/admin/apiLog', '/admin/userMg', '/admin/userOperation', '/admin/operationLog'].includes(path)) {
        router.push(path.replace('/admin', ''));
      }
    } else {
      if (path === '/admin') {
        router.push('/admin/operationLog');
      }
      if (['/apiLog', '/userMg', '/userOperation', '/operationLog'].includes(path)) {
        router.push('/admin' + path);
      }
    }
  }

  function getUserInfo() {
    apiBaseGet('/api/user/getUserInfo', { id: localStorage.getItem('userId') })
      .then((res) => {
        user.setUserInfo(res.data);
        bookmark.theme = res.data.theme ?? 'day';
        getThemeStyle(bookmark.theme);
        localStorage.setItem('theme', bookmark.theme);
        if (res.status !== 200) {
          router.push('/home');
          localStorage.setItem('userId', '');
          bookmark.isShowLogin = true;
        }
      })
      .catch((e) => {
        console.error('接口错误：', e);
        localStorage.setItem('userId', '');
        bookmark.theme = 'day';
        router.push('/home');
        bookmark.isShowLogin = true;
      });
  }

  router.beforeEach((to, from, next) => {
    routerChange(bookmark.isPhone, to.path);
    next();
  });
</script>
<style></style>
