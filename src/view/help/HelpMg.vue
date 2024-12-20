<template>
  <PHelp v-if="bookmark.isPhone" />
  <Help v-else />
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import PHelp from '@/view/help/components/PHelp.vue';
  import Help from '@/view/help/components/Help.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
