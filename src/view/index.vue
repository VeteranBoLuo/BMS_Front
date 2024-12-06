<template>
  <div
    id="tag-container"
    :style="{
      backgroundImage: bookmark.isPhone ? 'unset' : '',
    }"
  >
    <Navigation />
    <router-view style="position: fixed; top: 60px; height: calc(100% - 60px);width: 100%" />
  </div>
</template>

<script lang="ts" setup>
  import Navigation from '@/view/tag/components/Navigation.vue';
  import { watch } from 'vue';
  import { bookmarkStore } from '@/store';
  import { onMounted } from 'vue';
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
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-image: var(--bg-image);
  }
</style>
