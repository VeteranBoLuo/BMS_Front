<template>
  <div style="display: flex; justify-content: space-between; border: 1px solid #ccc">
    <div class="css-animation-container">
      <div
        v-for="item in cssList"
        class="list"
        @click="(component = item.component), (currentName = item.name)"
        :style="{
          backgroundColor: item.name === currentName ? '#4e4b46' : '',
          color: item.name === currentName ? '#fff' : '',
        }"
      >
        {{ item.name }}
      </div>
    </div>
    <div style="width: calc(100% - 200px); display: grid; place-items: center">
      <component :is="component" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import loading from './components/loading.vue';
  import ActiveButton from './components/ActiveButton.vue';
  import RotateCard from './components/RotateCard.vue';
  const component = ref(loading);
  const currentName = ref('加载');
  const cssList = [
    {
      name: '加载',
      component: loading,
    },
    {
      name: '下压按钮',
      component: ActiveButton,
    },
    {
      name: '旋转定位卡片',
      component: RotateCard,
    },
  ];
</script>

<style lang="less" scoped>
  .css-animation-container {
    height: 800px;
    border: 1px solid #ccc;
    width: 200px;
    .list {
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        background-color: #4e4b46;
        color: white;
      }
    }
  }
</style>
