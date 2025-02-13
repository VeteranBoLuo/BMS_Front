<template>
  <div>
    <div class="progress-container">
      <div class="progress-body">
        <div class="operation-menu">
          <span class="operation-menu-item" v-for="item in btns" @click="handleChange(item)">{{ item }}</span>
        </div>
        <div class="progress-bar" :style="{ width: options.percent + '%' }"> </div>
      </div>
      <div style="font-size: 14px; width: 50px">{{ options.percent }}%</div>
    </div>
    <div class="result-des" v-show="isShowStatus">
      <svg-icon :src="statusIcon" />
      {{ props.options.message }}
      <slot name="res-des" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import icon from '@/config/icon.ts';
  import { computed, ref, watch } from 'vue';

  const props = withDefaults(
    defineProps<{
      options: { percent: string | number; status: number; message?: string };
      operation: { [key: string]: string[] };
    }>(),
    {
      options: () => ({
        percent: 0,
        status: 1,
      }),
    },
  );

  const btns = computed(() => {
    return props.operation[props.options.status];
  });
  const iconOptions = {
    0: icon.navigation.sun,
    1: icon.navigation.close,
    2: icon.navigation.sun,
  };
  const statusIcon = computed(() => {
    return iconOptions[props.options.status];
  });
  const emit = defineEmits(['handle']);
  function handleChange(status) {
    emit('handle', status);
  }
  const isShowStatus = ref(false);
  watch(
    () => props.options.message,
    (val) => {
      if (val) {
        const timer = setTimeout(() => {
          isShowStatus.value = true;
          clearTimeout(timer);
        }, 100);
      } else {
        isShowStatus.value = false;
      }
    },
  );
</script>

<style lang="less">
  .progress-container {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  .progress-body {
    width: 100%;
    background-color: #eee;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-bar {
    height: 5px;
    background-color: #007bff;
    border-radius: 4px;
    transition: width 0.1s linear; /* 动画效果 */
  }
  .operation-menu {
    position: absolute;
    bottom: 20px;
    right: 40px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 5px;
    height: 1rem;
  }
  .operation-menu-item {
    font-size: 12px;
    color: #1677ff;
    cursor: pointer;
  }
  .result-des {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
</style>
