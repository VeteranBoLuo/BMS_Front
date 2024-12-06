<template>
  <div class="pane_css" v-if="actName === name">
    <slot> </slot>
  </div>
</template>

<script lang="ts" setup>
  import { inject, ref, toRef } from 'vue';
  const props = defineProps({
    name: {
      type: String,
        default:''
    },
    label: {
      type: String,
      default: '',
    },
  });
  //接收tab传递过来的currentTab
  const actName = toRef(inject('actName'));
</script>

<style scoped lang="less">
  .pane_css {
    position: relative;
    top: 5px;
  }
</style>
