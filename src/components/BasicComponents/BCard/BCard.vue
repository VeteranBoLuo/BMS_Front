<template>
  <div class="card-container">
    <div class="card-container-header">
      <!--   卡片标题     -->
      <div class="card-title" :style="{ fontSize: size + 'px' }">
        <slot name="title">
          <span>
            {{ title }}
          </span>
        </slot>
      </div>
      <!--  卡片右上角的操作区域      -->
      <div class="card-extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <!--  卡片主要内容    -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    title: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: 14,
    },
  });
</script>

<style lang="less">
  .card-container {
    height: 100%;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    padding: 16px;
    background: rgb(255, 255, 255);

    .card-container-header {
      display: flex;
      justify-content: space-between;
    }
  }

  .card-title {
    color: rgb(25, 25, 25);
    font-family: HarmonyOS Sans SC;
    font-weight: 550;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
  }
</style>
