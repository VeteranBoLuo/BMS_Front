<template>
  <login v-if="bookmark.isShowLogin" />
  <BViewer />
</template>

<script lang="ts" setup>
  import BViewer from '@/components/base/Viewer/BViewer.vue';
  import Login from '@/App.vue';
  import { bookmarkStore } from '@/store';

  const bookmark = bookmarkStore();
</script>

<style lang="less" scoped></style>
