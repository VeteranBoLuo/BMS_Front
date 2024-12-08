<template>
  <div class="manage-container flex-center">
    <div class="manage-body flex-center">
      <!--      <h2> 管理员：{{ user.userName }} </h2>-->
      <div class="mange-menu">
        <category-button
          class="mange-menu-item"
          v-for="item in menuOptions"
          :style="{ backgroundColor: item.color }"
          @click="handleMenu(item)"
          v-click-log="{ module: '配置中心', operation: `点击${item.name}` }"
          >{{ item.name }}
          <template #icon>
            <svg-icon :src="item.icon" />
          </template>
        </category-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { bookmarkStore, useUserStore } from '@/store';
  import router from '@/router';
  import CategoryButton from '@/components/manage/CategoryButton.vue';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import icon from '@/config/icon';
  import { message } from 'ant-design-vue';
  const bookmark = bookmarkStore();
  const user = useUserStore();
  const options = ['新建书签', '新建标签', '书签列表', '标签列表'];
  interface MgsMenuInterface {
    name: string;
    color: string;
    icon?: string;
    url?: string;
  }
  const menuOptions: MgsMenuInterface[] = [
    {
      name: '标签管理',
      color: '#9e48ec',
      icon: icon.manage_categoryBtn_tag,
      url: '/manage/editTag',
    },
    {
      name: '书签管理',
      color: '#7abe15',
      icon: icon.manage_categoryBtn_bookmark,
      url: '/manage/editBookmark',
    },
    {
      name: '帮助文档',
      color: '#3577ef',
      icon: icon.manage_categoryBtn_document,
      url: '/help',
    },
    {
      name: '共享社区',
      color: '#e83655',
      icon: icon.navigation_user,
      url: '',
    },
  ];

  function handleMenu(menu) {
    if (menu.name === '共享社区') {
      message.info('该功能暂未开放');
      return;
    }
    if (menu.url) {
      router.push(menu.url);
    }
  }
</script>

<style lang="less">
  .manage-container {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to right top, black 50%, white 0%);
  }
  .mange-menu {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .manage-body {
    position: relative;
    bottom: 60px;
  }

  .mange-menu-item {
    height: 70px;
    color: #f0f0f0; // #ced1d7
    border-radius: 12px;
    cursor: pointer;
    display: grid;
    place-items: center;
  }

  @media (max-width: 600px) {
    .mange-menu {
      grid-template-columns: unset;
    }
  }

  @media (max-width: 1350px) {
    .manage-body {
      width: 90%;
    }
  }
  @media (min-width: 1351px) and (max-width: 1919px) {
    .manage-body {
      width: 60%;
    }
  }
  @media (min-width: 1920px) {
    .manage-body {
      width: 40%;
    }
  }
</style>
