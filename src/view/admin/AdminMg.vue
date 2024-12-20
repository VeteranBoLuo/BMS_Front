<template>
  <PAdmin v-if="bookmark.isPhone" />
  <Admin v-else />
</template>

<script lang="ts" setup>
  import PAdmin from '@/view/admin/components/phone/PAdmin.vue';
  import Admin from '@/view/admin/components/desktop/Admin.vue';
  import { bookmarkStore } from '@/store';
  const bookmark = bookmarkStore();
</script>

<style lang="less"></style>
