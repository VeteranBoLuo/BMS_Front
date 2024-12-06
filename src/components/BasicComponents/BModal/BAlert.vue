<template>
  <Teleport to="body">
    <div class="bAlert" :class="{ out: isExit }">
      <div style="height: 50px; border-bottom: 1px solid #f0f0f0; box-sizing: border-box">
        <slot name="title">
          <div style="padding: 10px">{{ title }}</div>
        </slot>
      </div>
      <div style="padding: 12px; color: var(--desc-color)">
        {{ content }}
      </div>
      <div
        style="
          position: absolute;
          bottom: 0px;
          height: 50px;
          border-top: 1px solid #f0f0f0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 20px;
          box-sizing: border-box;
        "
      >
        <slot name="footer">
          <b-space>
            <b-button class="btn" type="primary" @click="onOk">{{ okText }}</b-button>
            <b-button class="btn" @click="obClose">{{ cancelText }}</b-button>
          </b-space>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import bAlert from '@/components/BasicComponents/BModal/Alert';
  import { ref } from 'vue';
  import BSpace from '@/components/BasicComponents/BSpace/BSpace.vue';
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '确认',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    content: {
      type: String,
      default: '取消',
    },
  });
  const isExit = ref(false);
  function obClose() {
    isExit.value = true;
    const timer = setTimeout(() => {
      bAlert.destroy();
      clearTimeout(timer);
    }, 200);
  }

  function onOk() {
    bAlert.onOk();
  }
</script>

<style scoped lang="less">
  .bAlert {
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    width: 460px;
    height: 180px;
    border: 1px solid #ebeef5;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    z-index: 9999;
    background-color: var(--modal-bg-color);
    animation: in-animation 0.3s ease;
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
    .bAlert {
      width: 90%;
    }
  }
</style>
