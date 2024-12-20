<template>
  <PhoneContainer title="个人中心" :style="{ backgroundColor: bookmark.theme === 'day' ? '#f6f7f9' : '#222222' }">
    <div class="person-title-card" :style="{ backgroundColor: bookmark.theme === 'day' ? '#97a1c6' : '#4d5264' }">
      <div style="display: flex; gap: 10px">
        <div :class="['navigation-icon']" :style="{ color: bookmark.iconColor }">
          <svg-icon
            img-id="viewUserImg"
            @click="zoomImage"
            size="50"
            :src="user.headPicture || icon.navigation_user"
            class="dom-hover"
          />
        </div>
        <div style="display: flex; flex-direction: column">
          <b style="font-size: 20px">{{ user.alias ? user.alias : '默认昵称' }}</b>
          <span style="font-size: 14px; color: #edf2fa">{{ user.userName }}</span>
        </div>
      </div>
      <div class="user-icon-text" :style="{ color: bookmark.iconColor }">
        <div style="display: flex; gap: 20px; font-size: 14px">
          <span
            >标签<span style="margin-left: 10px">{{ user.tagTotal }}</span></span
          >
          <span
            >书签<span style="margin-left: 10px">{{ user.bookmarkTotal }}</span></span
          >
        </div>
      </div>
    </div>
    <div class="person-menu">
      <div class="person-menu-item" @click="$router.push('/myInfo')">
        <span class="person-menu-item-title">个人资料</span>
        <span class="person-menu-item-des"
          >邮箱、昵称等
          <svg-icon color="#999fa8" style="rotate: 180deg" :src="icon.arrow_left" size="14" />
        </span>
      </div>
    </div>
    <div class="person-menu">
      <div class="person-menu-item">
        <span class="person-menu-item-title">主题设置</span>
        <span class="person-menu-item-des">{{ ThemeName }}</span></div
      >
      <div v-if="user.role === 'root'" class="person-menu-item" @click="router.push('/admin')">
        <span class="person-menu-item-title">后台管理</span>
        <span class="person-menu-item-des"
          >日志、用户管理等<svg-icon color="#999fa8" style="rotate: 180deg" :src="icon.arrow_left" size="14" /></span
      ></div>
      <div class="person-menu-item" @click="$router.push('/manage/tagMg')">
        <span class="person-menu-item-title">标签管理</span>
        <span class="person-menu-item-des"
          ><svg-icon color="#999fa8" style="rotate: 180deg" :src="icon.arrow_left" size="14" /></span
      ></div>
      <div class="person-menu-item" @click="$router.push('/manage/bookmarkMg')">
        <span class="person-menu-item-title">书签管理</span>
        <span class="person-menu-item-des"
          ><svg-icon color="#999fa8" style="rotate: 180deg" :src="icon.arrow_left" size="14" /></span
      ></div>
    </div>
    <div class="person-menu">
      <div class="person-menu-item" @click="$router.push('/opinions')">
        <span class="person-menu-item-title">意见反馈</span>
        <span class="person-menu-item-des"
          ><svg-icon color="#999fa8" style="rotate: 180deg" :src="icon.arrow_left" size="14" /></span
      ></div>
      <div class="person-menu-item" @click="$router.push('/help')">
        <span class="person-menu-item-title">帮助中心</span>
        <span class="person-menu-item-des"
          ><svg-icon color="#999fa8" style="rotate: 180deg" :src="icon.arrow_left" size="14" /></span
      ></div>
    </div>
    <div class="person-menu" @click="handleExitLogin">
      <div class="person-menu-item" style="justify-content: center">
        <span class="person-menu-item-title">{{ user.role === 'visitor' ? '登录/注册' : '退出登录' }}</span></div
      >
    </div>
    <my-info v-if="userVisible" v-model:visible="userVisible" />
  </PhoneContainer>
</template>

<script setup lang="ts">
  import router from '@/router';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { bookmarkStore, useUserStore } from '@/store';
  import Alert from '@/components/BasicComponents/BModal/Alert.ts';
  import { computed, ref } from 'vue';
  import userApi from '@/api/userApi.ts';
  import MyInfo from '@/view/configCenter/components/desktop/MyInfo.vue';
  import Viewer from '@/components/Viewer/BViewer.vue';
  import PhoneContainer from '@/components/phoneComponents/PhoneContainer/PhoneContainer.vue';

  const bookmark = bookmarkStore();
  const getPopupContainer = (trigger: HTMLElement) => {
    return document.getElementById('tag-container');
  };
  const menuVisible = ref(false);
  const userVisible = ref(false);

  const user = useUserStore();

  function getThemeStyle(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function handleExitLogin() {
    menuVisible.value = false;
    if (user.role === 'visitor') {
      bookmark.isShowLogin = true;
    } else {
      Alert.alert({
        title: '提示',
        content: '此操作将退出登录, 是否继续?',
        onOk() {
          // 清空当前用户信息
          user.resetUserInfo();
          // 打开登录页面
          bookmark.isShowLogin = true;
          // 刷新游客书签和标签
          bookmark.type = 'all';
          bookmark.refreshTag();
          router.push('/home');
          // 获取游客信息
          userApi.getUserInfoById({ id: localStorage.getItem('userId') }).then((res) => {
            if (res.status === 200) {
              user.setUserInfo(res.data);
              bookmark.theme = res.data.theme;
              getThemeStyle(res.data.theme);
              localStorage.setItem('theme', res.data.theme);
            }
          });
        },
      });
    }
  }

  const ThemeName = computed(() => {
    if (bookmark.theme === 'night') {
      return '深色';
    }
    return '浅色';
  });
  const viewer = ref<Viewer>();

  function zoomImage() {
    const src = user.headPicture || icon.navigation_user;
    if (src === icon.navigation_user) {
      return;
    }
    bookmark.refreshViewer(user.headPicture || icon.navigation_user);
    menuVisible.value = false;
  }
</script>

<style lang="less" scoped>
  .phone-person-container {
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .phone-person-navigation {
    margin: 0 auto;
    font-size: 20px;
    font-weight: 550;
    width: calc(100% - 40px);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
  }

  .person-title-card {
    gap: 40px;
    padding: 15px;
    height: 160px;
    box-sizing: border-box;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
  }

  .person-menu {
    border-radius: 12px;
    overflow: hidden;
    margin-top: 20px;
  }

  .person-menu-item {
    background-color: var(--phone-menu-item-bg-color);
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    cursor: pointer;
    &:not(:last-child) {
      border-bottom: 1px solid var(--phone-menu-item-border-color);
    }
    .person-menu-item-title {
    }

    .person-menu-item-des {
      color: #999fa8;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      line-height: 100%;
    }
  }

  .navigation-icon {
    display: flex;
    align-items: center;
    clip-path: circle(50% at 50% 50%);
    cursor: pointer;
  }

  .handle-body {
    border-radius: 8px;
    background-color: var(--user-body-bg-color);
    margin-top: 15px;
    padding: 5px;
    width: 220px;

    .handle-body-title-body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      align-items: center;
    }
  }

  .header_menu_ul {
    list-style-type: none;
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    .li {
      height: 30px;
      cursor: pointer;
      font-size: 12px;
      border-radius: 4px;
      color: var(--text-color);
      gap: 10px;

      &:hover {
        background-color: var(--menu-item-h-bg-color);
        border-radius: 8px;
      }
    }
  }

  .user-icon-text {
    text-align: left;
    color: white !important;
  }



  .modal-content {
    margin: auto;
    display: block;
    height: 90%;
    width: 80%;
    max-width: 700px;
  }

  .modal-content {
    -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.6s;
    animation-name: zoom;
    animation-duration: 0.6s;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .header_menu_ul {
    }

    .modal-content {
      height: 60%;
      width: 80%;
      max-width: 700px;
    }
  }
</style>
