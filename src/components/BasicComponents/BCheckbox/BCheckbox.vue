<template>
  <div
    class="checkbox_container"
    @click="isCheck = !isCheck"
    :style="{ backgroundColor: isCheck ? '#2c9e48' : '' }"
  >
    <Icon
      v-if="isCheck"
      icon="material-symbols:check"
      color="white"
      width="12"
      height="12"
      style="margin: auto"
    />
  </div>
</template>

<script lang="ts" setup>
  const isCheck = defineModel('isCheck');
</script>

<style lang="less">
  .checkbox_container {
    height: 12px;
    width: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    cursor: pointer;
  }
</style>
