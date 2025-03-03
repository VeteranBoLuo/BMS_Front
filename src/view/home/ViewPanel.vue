<template>
  <div class="view-panel" id="view-panel">
    <TagInfo />
    <CardPanel />
  </div>
</template>

<script lang="ts" setup>
  import TagInfo from '@/view/home/components/TagInfo.vue';
  import CardPanel from '@/view/home/components/CardPanel.vue';

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
