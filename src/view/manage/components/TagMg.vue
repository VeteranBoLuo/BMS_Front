<template>
  <PTagTable v-if="bookmark.isPhone" />
  <TagTable v-else />
</template>

<script lang="ts" setup>
  import TagTable from '@/view/manage/components/pc/TagTable.vue';
  import { bookmarkStore } from '@/store';
  import PTagTable from '@/view/manage/components/phone/PTagTable.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
