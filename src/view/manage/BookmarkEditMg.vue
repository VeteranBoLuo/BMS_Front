<template>
  <PBookmarkEdit v-if="bookmark.isPhone" />
  <BookmarkEdit v-else />
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import BookmarkEdit from '@/view/manage/components/desktop/BookmarkEdit.vue';
  import PBookmarkEdit from '@/view/manage/components/phone/PBookmarkEdit.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
