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
    </a-config-provider>
  </div>
</template>
<script setup>
  // 检查本地存储中是否有用户数据
  import userApi from '@/api/userApi';
  import router from '@/router';
  import { bookmarkStore, useUserStore } from '@/store';
  import { watch } from 'vue';
  import login from '@/view/login/index.vue';

  const user = useUserStore();
  const bookmark = bookmarkStore();
  try {
    userApi
      .getUserInfoById({ id: localStorage.getItem('userId') })
      .then((res) => {
        if (res.status === 200) {
          user.setUserInfo(res.data);
          bookmark.theme = res.data.theme;
          getThemeStyle(res.data.theme);
          localStorage.setItem('theme', res.data.theme);
        } else {
          router.push('/home');
        }
      })
      .catch((e) => {
        console.error('接口错误：', e);
        router.push('/home');
      });
  } catch (e) {
    router.push('/home');
  }
  if (!localStorage.getItem('userId')) {
    bookmark.isShowLogin = true;
  }

  watch(
    () => bookmark.theme,
    (val) => {
      getThemeStyle(val);
    },
  );
  // 页面加载前需要提前预设置主题，否则如果后台查询是黑夜主题，但是页面默认是白色的，页面会从白到黑闪一下，这种情况就需要提前设置为黑色
  const theme = localStorage.getItem('theme');
  if (theme) {
    bookmark.theme = theme;
  }
  function getThemeStyle(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

</script>
<style></style>
