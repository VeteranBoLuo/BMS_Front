<template>
  <div
    id="tag-container"
    :style="{
      backgroundImage: bgVisible,
    }"
  >
    <Navigation v-if="!bookmark.isPhone || router.currentRoute.value.path.includes('home')" />
    <router-view style="position: fixed; top: 60px; height: calc(100% - 60px); width: 100%; box-sizing: border-box" />
  </div>
</template>

<script lang="ts" setup>
  import Navigation from '@/view/tag/components/Navigation.vue';
  import { bookmarkStore } from '@/store';
  import router from '@/router';
  import { computed } from 'vue';
  const bookmark = bookmarkStore();

  bookmark.screenWidth = window.innerWidth;

  window.onresize = () => {
    bookmark.screenWidth = window.innerWidth;
    bookmark.screenHeight = window.innerHeight;
  };

  const bgVisible = computed(() => {
    if (bookmark.isPhone || router.currentRoute.value.name === 'NoteDetail') {
      return 'unset';
    }
    return '';
  });
</script>

<style lang="less" scoped>
  #tag-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-image: var(--bg-image);
  }
</style>
