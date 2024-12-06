<template>
  <div class="lazyCard">
    <div v-for="(item, index) in 50" :key="index" style="height: 500px">
      <lazy-container style="height: 200px; width: 200px">
        <div class="test_div">{{ index }}</div>
      </lazy-container>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LazyContainer from '@/components/LazyComponents/LazyContainer.vue';
</script>
<style scoped lang="less">
  .lazyCard {
    height: 800px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
    gap: 20px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    overflow: auto;
  }
  .test_div {
    height: 200px;
    border: 1px solid #e0e3ea;
    background-color: #7b7d80;
    border-radius: 10px;
    display: grid;
    place-items: center;
  }
</style>
