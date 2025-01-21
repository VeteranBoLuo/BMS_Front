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
        <div class="handle-body-title-body" v-if="user.role !== 'root'">
          <div class="flex-center" style="height: 40px; color: var(--text-color); gap: 10px; font-size: 12px">
            <svg-icon size="14" :src="icon.theme" />
            主题模式
          </div>
          <div style="text-align: right; padding-right: 20px; color: #969ba2">
            {{ ThemeName }}
          </div>
        </div>
        <div v-else>
          <div style="width: 100%; padding-left: 12px; font-size: 14px" class="flex-align-center-gap">
            <span style="color: var(--text-color)"
              >进度 <a>{{ result.iteration }}</a> 次</span
            >
            <span style="color: var(--text-color)"
              >下一次 <a>{{ result.nextDate }}</a></span
            >
          </div>
        </div>
        <hr
          style="width: calc(100% - 20px); border: unset; height: 1px"
          :color="bookmark.theme === 'day' ? '#f6f7f9' : '#4e5262'"
        />
        <div class="header_menu_ul">
          <div
            v-for="menuItem in menuOptions"
            class="flex-center li"
            v-click-log="{ module: '个人中心', operation: menuItem.label }"
            @click="menuItemClick(menuItem)"
          >
            <svg-icon size="14" :src="menuItem.icon" />
            {{ menuItem.label }}
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

  interface menuItemInterface {
    label: string;
    path?: string;
    role?: string;
    icon: string;
  }

  const options = ref<menuItemInterface[]>([
    {
      label: '后台管理',
      path: '/admin',
      role: 'root',
      icon: icon.user_admin,
    },
    {
      label: '标签管理',
      path: '/manage/tagMg',
      icon: icon.manage_categoryBtn_tag,
    },
    {
      label: '书签管理',
      path: '/manage/bookmarkMg',
      icon: icon.manage_categoryBtn_bookmark,
    },
    {
      label: '帮助中心',
      path: '/help',
      icon: icon.help_document,
    },
    {
      label: '意见反馈',
      icon: icon.userCenter_OperationLog,
    },
  ]);
  const menuOptions = computed(() => {
    if (user.role === 'root') {
      return options.value;
    }
    return options.value.filter((item) => item.role !== 'root');
  });

  function menuItemClick(menuItem: menuItemInterface) {
    menuVisible.value = false;
    if (menuItem.path) {
      router.push(menuItem.path);
    } else {
      switch (menuItem.label) {
        case '意见反馈':
          opinionsVisible.value = true;
          break;
        default:
          break;
      }
    }
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

  function calculateIterationAndNextDate(initialDate, currentDateStr = new Date().toISOString().split('T')[0]) {
    const initialDateTime = new Date(initialDate);
    const currentDate = new Date(currentDateStr);
    let interval = 3; // 初始间隔为3天

    // 计算当前日期与初始日期之间的天数差
    const timeDiff = currentDate - initialDateTime;
    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // 计算是第几次
    let iteration = 0;
    let totalDays = 0;
    while (totalDays + interval <= diffDays) {
      totalDays += interval;
      interval += 1; // 每次间隔增加1天
      iteration += 1;
    }

    // 如果当前日期小于初始日期，则还没有开始
    if (diffDays < 0) {
      iteration = 0;
      totalDays = 0;
    }

    // 计算下一次的日期
    const nextDate = new Date(initialDateTime);
    nextDate.setDate(initialDateTime.getDate() + totalDays + interval);

    // 返回结果
    return {
      iteration: iteration,
      nextDate: nextDate.toISOString().split('T')[0], // 格式化为YYYY-MM-DD
    };
  }

  // 使用函数
  const initialDate = '2025-01-09';
  const result = calculateIterationAndNextDate(initialDate);
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
