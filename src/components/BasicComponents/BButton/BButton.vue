<template>
  <div class="b_btn" :style="{ border }" :class="[btnClass, danger]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';

  const props = defineProps({
    size: {
      type: String as PropType<'default' | 'small' | 'large'>,
      default: 'default',
    },
    type: {
      type: String as PropType<'primary' | 'dashed' | 'success' | 'danger'>,
      default: '',
    },
    danger: {
      type: Boolean,
      default: false,
    },
    border: {
      type: String,
      default: '',
    },
  });

  const btnClass = computed(() => {
    if (props.type === 'primary') {
      return 'primary_btn';
    } else if (props.type === 'dashed') {
      return 'dashed_btn';
    } else if (props.type === 'success') {
      return 'success_btn';
    } else if (props.type === 'danger') {
      return 'danger_btn';
    } else {
      return 'default_btn';
    }
  });
</script>

<style scoped lang="less">
  .b_btn {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    white-space: nowrap;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    height: 32px;
    transition: color 0.2s;
    width: max-content;
    display: inline-block;
    padding: 4px 15px;
    font-size: 14px;
  }
  .primary_btn {
    color: white;
    background-color: #4e4b46;
    transition: all 0.3s;
    &:hover {
      background-color: #6e6c6a;
    }
  }
  .dashed_btn {
    border: 2px dashed #d9d9d9;
    &:hover {
      color: var(--primary-color);
      border-color: var(--primary-color);
    }
  }
  .default_btn {
    &:hover {
      color: #ff9800;
      border: 1px solid #ff9800;
      transition: all 0.3s;
    }
  }
  .danger_btn {
    background-color: #ff4d4f;
    color: white;
    transition: all 0.3s;
    &:hover {
      background-color: #ff7875;
    }
  }
  .success_btn {
    background-color: #2baf2b;
    color: white;
    transition: all 0.3s;
    &:hover {
      background-color: #6ccf70;
    }
  }
</style>
