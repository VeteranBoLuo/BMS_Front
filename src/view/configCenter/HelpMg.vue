<template>
  <PHelp v-if="bookmark.isPhone" />
  <Help v-else />
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import PHelp from '@/view/configCenter/components/phone/PHelp.vue';
  import Help from '@/view/configCenter/components/desktop/Help.vue';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
