<template>
  <div
    id="tag-container"
    :style="{
      backgroundImage: bookmark.isPhone ? 'unset' : '',
    }"
  >
    <Navigation v-if="!bookmark.isPhone || router.currentRoute.value.path.includes('home')" />
    <router-view style="position: fixed; top: 60px; height: calc(100% - 60px); width: 100%" />
  </div>
</template>

<script lang="ts" setup>
  import Navigation from '@/view/tag/components/Navigation.vue';
  import { bookmarkStore } from '@/store';
  import router from '@/router';
  const bookmark = bookmarkStore();

  bookmark.screenWidth = window.innerWidth;

  window.onresize = () => {
    bookmark.screenWidth = window.innerWidth;
    bookmark.screenHeight = window.innerHeight;
  };
</script>

<style lang="less" scoped>
  #tag-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-image: var(--bg-image);
  }
</style>
