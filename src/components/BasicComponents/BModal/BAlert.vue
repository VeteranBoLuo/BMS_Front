<template>
  <Teleport to="body">
    <div class="bAlert-bg">
      <div class="bAlert" :class="{ out: isExit }">
        <slot name="title">
          <div style="font-size: 16px; margin-bottom: 15px">{{ title }}</div>
        </slot>
        <div style="color: var(--desc-color); font-size: 14px">
          {{ content }}
        </div>
        <div
          style="
            position: absolute;
            bottom: 20px;
            width: calc(100% - 40px);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            box-sizing: border-box;
          "
        >
          <slot name="footer" v-if="footer?.length > 0">
            <b-space>
              <b-button
                v-for="btn in footer"
                class="btn"
                :type="btn.type"
                @click="btn.function ? btnFunc(btn.function) : obClose()"
                >{{ btn.label }}</b-button
              >
            </b-space>
          </slot>
          <b-space v-else>
            <b-button class="btn" @click="obClose(200)">{{ cancelText }}</b-button>
            <b-button class="btn" type="primary" @click="onOk">{{ okText }}</b-button>
          </b-space>
        </div>
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
    footer: {
      type: Array,
      default: () => [],
    },
  });
  const isExit = ref(false);
  function obClose(time = 200) {
    isExit.value = true;
    const timer = setTimeout(() => {
      bAlert.destroy();
      clearTimeout(timer);
    }, time);
  }

  function onOk() {
    bAlert.onOk();
  }

  function btnFunc(func) {
    obClose(0);
    func();
  }
</script>

<style scoped lang="less">
  .bAlert-bg {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99999999;
  }
  .bAlert {
    position: relative;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: 460px;
    height: 180px;
    //box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 16px;
    z-index: 9999;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.6);
    background-color: var(--menu-body-bg-color);
    animation: in-animation 0.3s ease;
    padding: 22px;
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
      top: 45%;
    }
  }
</style>
