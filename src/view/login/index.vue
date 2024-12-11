<template>
  <teleport to="body">
    <div class="index-container">
      <div class="index-view">
        <LoginPage v-model:title="title" />
        <!------------注册------------->
        <RegisterPage v-model:title="title" />
        <!------------重置------------->
        <ResetPage v-model:title="title" />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import router from '@/router';
  import { message } from 'ant-design-vue';
  import userApi from '@/api/userApi';
  import { bookmarkStore, useUserStore } from '@/store';
  import LoginPage from '@/view/login/components/LoginPage.vue';
  import ResetPage from '@/view/login/components/ResetPage.vue';
  import RegisterPage from '@/view/login/components/RegisterPage.vue';

  // 是否反转
  const title = ref('登录');

  const user = useUserStore();


  const bookmark = bookmarkStore();


  onMounted(() => {
    document.addEventListener('mouseup', closeMask);
    document.addEventListener('keydown', clickEsc);
    localStorage.setItem('userId', '');
  });

  onUnmounted(() => {
    document.removeEventListener('mouseup', closeMask);
    document.addEventListener('keydown', clickEsc);
  });

  function closeMask(e) {
    if (typeof e?.target?.className === 'string') {
      if (e.target.className === 'index-container') {
        bookmark.isShowLogin = false;
      }
    }
  }

  function clickEsc(e) {
    if (e.keyCode === 27) {
      bookmark.isShowLogin = false;
    }
  }
</script>

<style scoped>
  .index-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    animation: in-animation 0.3s ease;
  }
  .index-view {
    width: 450px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
  }
  :deep(.ant-form-item .ant-form-item-label) {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  :deep(.view-page) {
    position: relative;
    padding: 20px;
    border-radius: 6px;
    display: grid;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  :deep(.view-body) {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    backface-visibility: hidden;
    transition: transform 0.6s linear;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-image: var(--bg-image2);
  }
  :deep(.hide) {
    transform: rotateY(180deg);
  }
  :deep(.b_input) {
    line-height: 40px;
  }
  :deep(.tips-text) {
    font-size: 14px;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  :deep(.handle-btn) {
    width: 80% !important;
    color: white !important;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  :deep(.disable-btn) {
    background-color: #ffc2c6;
    cursor: unset;
    pointer-events: none;
  }

  @keyframes in-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    .index-view {
      height: 400px;
    }
    :deep(.view-body) {
      width: 80%;
    }
  }
</style>
