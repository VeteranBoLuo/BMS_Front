<template>
  <div>
    <virtual-list :dataList="dataList" />
  </div>
</template>

<script lang="ts" setup>
  import VirtualList from '@/components/VirtualList/VirtualList.vue';
  import { onMounted, reactive } from 'vue';
  const dataList: any = reactive<Array<any>>([]); // 所有数据

  onMounted(() => {
    for (let index = 1; index <= 100000; index++) {
      dataList.push({ name: `列表项---${index}` });
    }
  });
</script>

<style lang="less"></style>
