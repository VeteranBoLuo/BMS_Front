<template>
  <div class="message" v-if="visible">
    <img :src="imgSrc" />
    <span class="text">{{ text }}</span>
  </div>
</template>
<script setup lang="ts">
  import warn from '@/assets/icons/warn.svg';
  import error from '@/assets/icons/error.svg';
  import success from '@/assets/icons/success.svg';
  import { onMounted, PropType, ref } from 'vue';
  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<'warn' | 'error' | 'success'>,
      default: 'warn',
    },
  });
  const visible = ref(false);
  const imgSrc = ref(warn);
  onMounted(() => {
    switch (props.type) {
      case 'warn':
        imgSrc.value = warn;
        break;
      case 'error':
        imgSrc.value = error;
        break;
      case 'success':
        imgSrc.value = success;
        break;
      default:
        break;
    }
    visible.value = true;
  });
</script>
<style>
  .message {
    position: fixed;
    z-index: 88888;
    color: black;
    left: 50%;
    height: 40px;
    line-height: 40px;
    top: 30px;
    transform: translate(-50%);
    padding: 12px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    animation: downed 300ms ease;
    border-radius: 4px;
    box-sizing: border-box;
  }
  @keyframes downed {
    0% {
      top: 0px;
    }
    100% {
      top: 30px;
    }
  }
  .text {
    margin-left: 5px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
