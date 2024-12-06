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
    </a-config-provider>
  </div>
</template>
<script setup>
  // 检查本地存储中是否有用户数据
  import userApi from '@/api/userApi';
  import router from '@/router';
  import { bookmarkStore, useUserStore } from '@/store';
  import { onMounted, watch } from 'vue';

  const user = useUserStore();
  const bookmark = bookmarkStore();
  if (typeof localStorage !== 'undefined') {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        userApi
          .getUserInfoById({ id: userId })
          .then((res) => {
            if (res.status === 200) {
              user.setUserInfo(res.data);
              bookmark.theme = res.data.theme || 'day';
            } else {
              router.push('/login');
            }
          })
          .catch((e) => {
            console.error('接口错误：', e);
            router.push('/login');
          });
      } else {
        console.log('未登录！！！');
        router.push('/login');
      }
    } catch (e) {
      router.push('/login');
    }
  } else {
    console.error('浏览器不支持localStorage');
    router.push('/login');
  }

  onMounted(() => {
    getThemeStyle(bookmark.theme);
  });

  watch(
    () => bookmark.theme,
    (val) => {
      getThemeStyle(val);
    },
  );
  function getThemeStyle(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }



</script>
<style></style>
