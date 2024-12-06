<template>
  <div class="view-panel" id="view-panel">
    <TagInfo />
    <CardPanel />
  </div>
</template>

<script lang="ts" setup>
  import TagInfo from '@/view/tag/components/TagInfo.vue';
  import CardPanel from '@/view/tag/components/CardPanel.vue';
  import { domStore } from '@/store';

  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="less">
  .view-panel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
