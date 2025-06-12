<template>
  <PHelp v-if="bookmark.isPhone" />
  <Help v-else />
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import PHelp from '@/components/personCenter/help/PHelp.vue';
  import Help from '@/components/personCenter/help/Help.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
