<template>
  <PhoneContainer
    title="后台管理"
    :style="{ backgroundColor: bookmark.theme === 'day' ? '#f6f7f9' : '#222222' }"
    @backClick="router.push('/personCenter')"
  >
    <PhoneMenu :menu-list="menuList" label="title" @click="clickItem" />
  </PhoneContainer>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import { bookmarkStore } from '@/store';
  import PhoneContainer from '@/components/phoneComponents/PhoneContainer/PhoneContainer.vue';
  import PhoneMenu from '@/components/phoneComponents/PhoneMenu/PhoneMenu.vue';
  import router from '@/router';
  const bookmark = bookmarkStore();
  const menuList = [
    [
      {
        id: 'operationLog',
        title: '操作日志',
        icon: icon.userCenter.operationLog,
        url: '/operationLog',
      },
      {
        id: 'apiLog',
        title: 'api日志',
        icon: icon.userCenter.log,
        url: '/apiLog',
      },
      {
        id: 'userMg',
        title: '用户管理',
        icon: icon.navigation.user,
        url: '/userMg',
      },
      {
        id: 'userOpinion',
        title: '用户反馈',
        icon: icon.userCenter.operationLog,
        url: '/userOpinion',
      },
      {
        id: 'imageMg',
        title: '图片管理',
        icon: icon.userCenter.imgMg,
        url: '/imageMg',
      },
    ],
  ];
  function clickItem(item) {
    router.push(item.url);
  }
</script>

<style lang="less" scoped></style>
