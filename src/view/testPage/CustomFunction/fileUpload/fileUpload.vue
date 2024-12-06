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
  import FileSplit from '@/view/testPage/CustomFunction/fileUpload/components/FileSplit.vue';
  import GenerateWebP from '@/view/testPage/CustomFunction/fileUpload/components/GenerateWebP.vue';
  const component = ref(GenerateWebP);
  const currentName = ref('webp图片生成');
  const cssList = [
    {
      name: 'webp图片生成',
      component: GenerateWebP,
    },
    {
      name: '文件上传',
      component: FileSplit,
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
