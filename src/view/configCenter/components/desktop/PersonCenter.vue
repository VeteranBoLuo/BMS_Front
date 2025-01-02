<template>
  <a-tooltip
    :color="bookmark.theme === 'day' ? '#97a1c6' : '#4d5264'"
    placement="bottomLeft"
    :get-popup-container="getPopupContainer"
    v-model:open="menuVisible"
  >
    <template #title>
      <div class="flex-align-center" style="gap: 15px; padding: 5px">
        <div :class="['navigation-icon']" :style="{ color: bookmark.iconColor }">
          <svg-icon
            img-id="viewUserImg"
            @click="zoomImage"
            size="40"
            :src="user.headPicture || icon.navigation_user"
            class="dom-hover"
          />
        </div>
        <div class="user-icon-text" :style="{ color: bookmark.iconColor }">
          <div class="flex-align-center" style="gap: 10px"
            ><b>{{ user.userName ? user.alias || '默认昵称' : '请登录' }}</b>
            <svg-icon class="dom-hover" :src="icon.card_edit" size="16" @click="editUser" />
          </div>
          <div style="display: flex; gap: 20px; font-size: 12px">
            <span
              >标签<span style="margin-left: 10px">{{ user.tagTotal }}</span></span
            >
            <span
              >书签<span style="margin-left: 10px">{{ user.bookmarkTotal }}</span></span
            >
          </div>
        </div>
      </div>
      <div class="handle-body">
        <div class="handle-body-title-body">
          <div class="flex-center" style="height: 40px; color: var(--text-color); gap: 10px; font-size: 12px">
            <svg-icon size="14" :src="icon.theme" />
            主题模式
          </div>
          <div style="text-align: right; padding-right: 20px; color: #969ba2">
            {{ ThemeName }}
          </div>
        </div>
        <hr
          style="width: calc(100% - 20px); border: unset; height: 1px"
          :color="bookmark.theme === 'day' ? '#f6f7f9' : '#4e5262'"
        />
        <div class="header_menu_ul">
          <div
            class="flex-center li"
            v-click-log="{ module: '个人中心', operation: `后台管理` }"
            @click="router.push('/admin'), (menuVisible = false)"
            v-if="user.role === 'root'"
          >
            <svg-icon size="14" :src="icon.user_admin" />
            后台管理
          </div>
          <div
            class="flex-center li"
            v-click-log="{ module: '个人中心', operation: `标签管理` }"
            @click="$router.push('/manage/tagMg'), (menuVisible = false)"
          >
            <svg-icon size="14" :src="icon.manage_categoryBtn_tag" />
            标签管理
          </div>
          <div
            class="flex-center li"
            v-click-log="{ module: '个人中心', operation: `书签管理` }"
            @click="$router.push('/manage/bookmarkMg'), (menuVisible = false)"
          >
            <svg-icon size="14" :src="icon.manage_categoryBtn_bookmark" />
            书签管理
          </div>
          <div
            class="flex-center li"
            v-click-log="{ module: '个人中心', operation: `帮助中心` }"
            @click="$router.push('/help'), (menuVisible = false)"
          >
            <svg-icon size="14" :src="icon.help_document" />
            帮助中心
          </div>
          <div
            class="flex-center li"
            v-click-log="{ module: '个人中心', operation: `意见反馈` }"
            @click="(opinionsVisible = true), (menuVisible = false)"
          >
            <svg-icon size="14" :src="icon.userCenter_OperationLog" />
            意见反馈
          </div>
          <div
            class="flex-center li"
            v-click-log="{ module: '个人中心', operation: user.role === 'visitor' ? '登录/注册' : '退出登录' }"
            @click="handleExitLogin"
          >
            <svg-icon size="14" :src="icon.user_exit" />
            {{ user.role === 'visitor' ? '登录/注册' : '退出登录' }}
          </div>
        </div>
      </div>
    </template>
    <div :class="['navigation-icon']">
      <svg-icon size="30" :src="user.headPicture || icon.navigation_user" class="dom-hover" />
    </div>
    <my-info v-if="userVisible" v-model:visible="userVisible" />
    <Opinions v-if="opinionsVisible" v-model:visible="opinionsVisible" />
  </a-tooltip>
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
  import Opinions from '@/view/configCenter/components/desktop/Opinions.vue';
  const bookmark = bookmarkStore();
  const getPopupContainer = (trigger: HTMLElement) => {
    return document.getElementById('tag-container');
  };
  const menuVisible = ref(false);
  const userVisible = ref(false);

  const opinionsVisible = ref(false);

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

  function zoomImage() {
    const src = user.headPicture || icon.navigation_user;
    if (src === icon.navigation_user) {
      return;
    }
    bookmark.refreshViewer(user.headPicture || icon.navigation_user);
    menuVisible.value = false;
  }

  function editUser() {
    userVisible.value = true;
    menuVisible.value = false;
  }
</script>

<style scoped lang="less">
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
