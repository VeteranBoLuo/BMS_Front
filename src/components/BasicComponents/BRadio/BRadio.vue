<template>
  <div class="bl-radio-group">
    <div
      class="bl-radio"
      v-for="(item, index) in options"
      :key="index"
      :class="{ 'element-primary': value === item.value }"
      @click="radioClick(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { cloneDeep } from 'lodash-es';

  const props = defineProps({
    value: {
      type: String,
      default: () => '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  });
  const emit = defineEmits(['update:value']);

  function radioClick(value) {
    emit('update:value', value);
  }
</script>

<style lang="less">
  @import '@/assets/css/index';
  .bl-radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  .bl-radio {
    cursor: pointer;
    line-height: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    width: max-content;
    border-radius: 4px;
    border: 1px solid var(--primary-color);
  }
</style>
