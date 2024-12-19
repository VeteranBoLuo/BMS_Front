<template>
  <PTagEdit v-if="bookmark.isPhone" />
  <TagEdit v-else />
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import PTagEdit from '@/view/manage/components/phone/PTagEdit.vue';
  import TagEdit from '@/view/manage/components/pc/TagEdit.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
