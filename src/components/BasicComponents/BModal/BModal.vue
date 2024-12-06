<template>
  <div v-show="visible" class="modal-container" @click.stop>
    <div class="modal-view" :class="{ in: visible, out: isOut }">
      <slot name="title">
        <div class="modal-title">{{ title }}</div>
      </slot>
      <div class="modal-content">
        <slot name="default"></slot>
      </div>
      <slot name="footer" v-if="showFooter">
        <div class="modal-footer">
          <b-space>
            <b-button type="primary" @click="$emit('ok')">确定</b-button>
            <b-button @click="handleClose">取消</b-button>
          </b-space>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BSpace from '@/components/BasicComponents/BSpace/BSpace.vue';
  import { onMounted, onUnmounted, ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      title: string;
      visible: boolean;
      maskClosable: boolean; // 点击遮罩层关闭
      showFooter: boolean; // 是否显示底部
      escClosable: boolean; // 按下esc关闭
    }>(),
    {
      visible: false,
      title: '默认标题',
      maskClosable: true,
      showFooter: true,
      escClosable: true,
    },
  );
  const emit = defineEmits(['ok', 'close']);
  const isOut = ref(false);

  function handleClose() {
    isOut.value = true;
    const timer = setTimeout(() => {
      isOut.value = false;
      emit('close');
      clearTimeout(timer);
    }, 250);
  }

  function closeMask(e) {
    if (typeof e?.target?.className === 'string') {
      if (props.maskClosable && e.target.className === 'modal-container') {
        handleClose();
      }
    }
  }

  function clickEsc(e) {
    if (props.escClosable && e.keyCode === 27) {
      handleClose();
    }
  }

  onMounted(() => {
    document.addEventListener('mouseup', closeMask);
    document.addEventListener('keydown', clickEsc);
  });
  onUnmounted(() => {
    document.removeEventListener('mouseup', closeMask);
    document.addEventListener('keydown', clickEsc);
  });
</script>

<style lang="less" scoped>
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: default;
    align-items: center;
    z-index: 999;
  }

  .modal-view {
    position: absolute;
    top: 10%;
    background-color: var(--modal-bg-color);
    padding: 20px;
    border-radius: 10px;
    min-width: 400px;
    min-height: 100px;
    display: grid;
  }

  .modal-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .modal-content {
    word-wrap: break-word; /* 允许单词在到达边界时断开换行 */
    overflow-wrap: break-word;
  }

  .modal-footer {
    margin-top: 10px;
    place-self: end;
  }

  .in {
    animation: in-animation 0.3s ease;
  }

  .out {
    animation: out-animation 0.3s ease;
  }

  @keyframes in-animation {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes out-animation {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }

  @media (max-width: 600px) {
    .modal-view {
      min-width: 80%;
    }
  }
</style>
