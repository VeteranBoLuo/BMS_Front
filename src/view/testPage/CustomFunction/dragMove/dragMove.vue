<template>
  <div class="container">
    <div
      style="
        height: 800px;
        width: 800px;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        overflow: auto;
      "
    >
      <div class="dragBody" ref="dragRef">
        指定位置才可拖拽
        <div v-drag="dragRef" style="cursor: move">
          <img src="../../../../assets/icons/drag.svg" style="height: 30px; width: 30px" />
        </div>
      </div>
      <div class="dragBody" style="position: absolute; left: 400px; cursor: move" v-drag>
        任意位置均可拖拽
      </div>
    </div>
    <code-des :value="dragCode" height="610px">
      <template #description>
        指定位置才可拖拽：在需要拖拽的元素上添加v-drag指令，即可实现对该元素的拖拽。在这种情况下，用户可以按住元素的任何区域进行拖拽。
        <br />
        任意位置均可拖拽：在元素上使用v-drag="xxx"，其中xxx为需要拖拽元素的ref值。在这种情况下，用户只能按住添加了v-drag="xxx"的元素进行拖拽，实际被拖拽的是对应的ref元素。
      </template>
    </code-des>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CodeDes from '@/components/BasicComponents/CodeDes/CodeDes.vue';
  import { dragCode } from '@/view/common.ts';

  const dragRef = ref();
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    width: 100%;
    color: white;
    top: 10px;
    position: relative;
    display: flex;
    text-align: center;
  }
  .dragBody {
    width: 300px;
    height: 200px;
    background-color: #fe2c55;
    color: var(--primary-text);
    border-radius: 4px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    position: absolute;
    left: 20px;
    padding: 5px;
  }
</style>
