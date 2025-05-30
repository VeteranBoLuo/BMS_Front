<template>
  <PHelp v-if="bookmark.isPhone" />
  <Help v-else />
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import PHelp from '@/view/configCenter/help/PHelp.vue';
  import Help from '@/view/configCenter/Help.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
