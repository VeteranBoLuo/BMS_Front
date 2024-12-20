<template>
  <PBookmarkTable v-if="bookmark.isPhone" />
  <BookmarkTable v-else />
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import BookmarkTable from '@/view/manage/components/desktop/BookmarkTable.vue';
  import PBookmarkTable from '@/view/manage/components/phone/PBookmarkTable.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
