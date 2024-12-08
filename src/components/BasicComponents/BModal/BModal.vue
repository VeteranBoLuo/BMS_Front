<template>
  <Teleport to="body">
    <div v-show="visible" class="modal-container" @click.stop>
      <div class="modal-view" :class="{ out: isOut }">
        <span style="position: absolute;right: 20px;top:20px;z-index: 99999;font-size: 20px" @click="handleClose" class="icon-hover">
          <img src="@/assets/icons/close.svg" width="20" height="20" alt="">
        </span>
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
  </Teleport>
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
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }

  .modal-view {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    background-color: var(--menu-body-bg-color);
    padding: 20px;
    border-radius: 10px;
    width: max-content;
    min-width: 400px;
    min-height: 100px;
    display: grid;
    z-index: 1000;
    animation: in-animation 0.3s ease;
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
  :deep(.b_input) {
    background-color: var(--modal-input-bg);
  }
  :deep(.b_textarea) {
    background-color: var(--modal-input-bg);

  }
  .modal-footer {
    margin-top: 10px;
    place-self: end;
  }

  .out {
    animation: out-animation 0.3s ease;
  }

  @keyframes in-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes out-animation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 600px) {
    .modal-view {
      min-width: 80%;
      top: 50%;
    }
  }

</style>
