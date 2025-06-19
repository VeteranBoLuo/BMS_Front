<template>
  <div id="app" style="height: 100vh; width: 100vw">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#4e4b46',
        },
      }"
    >
      <router-view />
      <login v-if="bookmark.isShowLogin" />
      <BViewer />
    </a-config-provider>
  </div>
</template>
<script setup lang="ts">
  // 检查本地存储中是否有用户数据
  import { bookmarkStore, useUserStore } from '@/store';
  import { h, nextTick, onMounted, watch } from 'vue';
  import login from '@/view/login/UserAuthModal .vue';
  import BViewer from '@/components/base/Viewer/BViewer.vue';
  import { apiBaseGet, apiQueryPost } from '@/http/request';
  import { useRouter } from 'vue-router';
  import { fingerprint } from '@/utils/common';
  import { notification } from 'ant-design-vue';

  const router = useRouter();
  const user = useUserStore();
  const bookmark = bookmarkStore();

  // 初始化主题和登录状态
  onMounted(() => {
    initApp();
  });

  // 监听主题变化
  watch(
    () => bookmark.theme,
    (val) => {
      applyTheme(val);
    },
  );

  function initApp() {
    // 页面加载前需要提前预设置主题，否则如果后台查询是黑夜主题，但是页面默认是白色的，页面会从白到黑闪一下，这种情况就需要提前设置为黑色
    const theme = localStorage.getItem('theme');
    if (theme) {
      bookmark.theme = theme;
    }
    applyTheme(bookmark.theme);
    // 设置指纹
    window['fingerprint'] = fingerprint();
  }

  async function getUserInfo() {
    try {
      const res = await apiBaseGet('/api/user/getUserInfo');
      user.setUserInfo(res.data);
      if (res.data.role === 'root') {
        if (res.data.opinionTotal > 0) {
          notification.open({
            message: '有新反馈',
            description: h('a', `总计${res.data.opinionTotal}条反馈`),
            onClick: () => {
              router.push('/admin/userOpinion');
            },
          });
        }
      }
      bookmark.theme = res.data.theme || 'day';
      localStorage.setItem('theme', bookmark.theme);
      if (res.status !== 200) {
        handleUserLogout();
      }
    } catch (error) {
      console.error('获取用户信息失败：', error);
      bookmark.theme = 'day';
      handleUserLogout();
    }
  }

  // 应用主题样式
  function applyTheme(theme) {
    // 禁用所有动画
    document.documentElement.classList.add('disable-animations');

    // 强制重绘确保样式生效
    void document.documentElement.offsetWidth;

    // 执行主题切换
    document.documentElement.setAttribute('data-theme', theme);

    // 下一事件循环恢复动画
    setTimeout(() => {
      document.documentElement.classList.remove('disable-animations');
      console.timeEnd('hh');
    }, 0);
  }

  // 设置动画
  function setTransition(val) {
    nextTick(() => {
      const filter = document.getElementById('phone-filter-panel');
      if (filter) {
        handleFilterTransition(filter, val);
      }
    });
  }

  function handleFilterTransition(filter, val) {
    if (val) {
      filter.style.transition = 'none';
      filter.style.transform = 'translateX(-100%)';
    } else {
      filter.style.transform = 'translateX(0)';
      filter.style.transition = 'unset';
      bookmark.isFold = true;
    }
  }

  // 手机端路由和电脑端不一样，切换不同尺寸设备后需要切换对应路由地址
  function handleRouteChange(isPhone: boolean, path: string) {
    if (isPhone) {
      if (
        ['/admin/apiLog', '/admin/userMg', '/admin/userOpinion', '/admin/operationLog', '/admin/imageMg'].includes(path)
      ) {
        router.push(path.replace('/admin', ''));
      }
    } else {
      if (path === '/admin') {
        router.push('/admin/operationLog');
      }
      if (['/apiLog', '/userMg', '/userOpinion', '/operationLog', '/imageMg'].includes(path)) {
        router.push('/admin' + path);
      }
    }
  }
  function handleUserLogout() {
    localStorage.setItem('userId', '');
    router.isReady().then(() => {
      if (router.currentRoute.value.name !== 'NoteDetail' && router.currentRoute.value.name !== 'updateLogs') {
        bookmark.isShowLogin = true;
      }
    });
  }

  router.beforeEach(async (to, from, next) => {
    // 确保用户信息已经加载完成
    if (!user.role) {
      // 等待用户信息加载完成
      await getUserInfo();
    }
    const roles = to.meta.roles || [];
    if (roles.length > 0 && !roles.includes(user.role)) {
      router.push('/403');
    }
    handleRouteChange(bookmark.isPhone, to.path);
    next();
  });

  // 监听设备类型变化
  watch(
    () => bookmark.isPhone,
    (val) => {
      handleRouteChange(val, router.currentRoute.value.path);
      setTransition(val);
    },
  );

  // 添加类型声明
  declare global {
    interface Window {
      InstallTrigger?: any;
    }
  }
  const isFirefox = typeof window?.InstallTrigger !== 'undefined';
  if (isFirefox) {
    const style = document.createElement('style');
    style.innerHTML = `
        * {
          scrollbar-width: thin;
        }
      `;
    document.head.appendChild(style);
  }
</script>
<style>
  .disable-animations * {
    animation: none !important;
    transition: none !important;
    animation-play-state: paused !important;
  }

  /* 2. 系统级动画禁用（尊重用户偏好） */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
