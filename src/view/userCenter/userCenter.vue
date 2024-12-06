<template>
  <div class="userContainer flex-justify-center">
    <div class="userContainer-body">
      <div class="left-menu-body">
        <div style="height: 50px; width: 100%; color: #ccc" class="flex-center">个人中心</div>
        <div
          class="left-menu-item"
          v-for="menu in viewOptions"
          :key="menu.key"
          :isCheck="menu.key === activeKey"
          v-click-log="{ module: '用户中心', operation: `${menu.label}` }"
          @click="handleClickItem(menu)"
        >
          <div class="flex-align-center" style="gap: 10px; font-size: 12px">
            <svg-icon :src="menu.icon" />
            {{ menu.label }}
          </div>
        </div>
      </div>
      <div class="right-content-body">
        <b-button
          style="position: absolute; right: 20px; top: 30px; z-index: 2"
          @click="$router.back()"
          v-click-log="{ module: '用户中心', operation: `返回` }"
          >返回</b-button
        >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import router from '@/router';
  import icon from '@/config/icon';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { useUserStore } from '@/store';

  const activeKey = computed(() => {
    return router.currentRoute.value.fullPath.split('/').pop();
  });
  const user = useUserStore();
  const menuOptions: { key: string; label: string; icon?: string; show?: any }[] = [
    {
      key: 'userHome',
      label: '首页',
      icon: icon.userCenter_home,
    },
    {
      key: 'myInfo',
      label: '我的信息',
      icon: icon.userCenter_info,
    },
  ];
  const viewOptions = computed(() => {
    return menuOptions.filter((item) => (item.show ? item.show() : true));
  });

  function handleClickItem(menu: { key: string; label: string }) {
    router.push('/userCenter/' + menu.key);
  }
</script>

<style lang="less">
  .userContainer {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    .userContainer-body {
      height: 90%;
      width: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
      //background: #fafafa;
      border-radius: 4px;
      display: flex;
      background-color: var(--userCenter-left-bg-color);
    }
  }
  .left-menu-body {
    box-sizing: border-box;
    flex: 15;
    min-width: 100px;
    height: 100%;
  }
  .left-menu-item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    padding-left: 20px;
    &:hover {
      background: var(--primary-color);
      color: #fff;
    }
  }
  [isCheck='true'] {
    background: var(--primary-color);
    color: #fff;
  }
  .right-content-body {
    position: relative;
    flex: 85;
    height: 100%;
    border-left: 1px solid #ddd;
    background-color: var(--userCenter-right-bg-color);
  }

  @media (max-width: 600px) {
    .userContainer {
      padding: 0px;
      .userContainer-body {
        width: 100%;
        height: 100%;
        border-radius: unset;
      }
    }
    .left-menu-item {
      padding-left: 10px;
    }

    .left-menu-body {
      flex: unset;
    }
    .right-content-body {
      flex: unset;
      width: calc(100% - 100px);
    }
  }

  @media (min-width: 600px) and (max-width: 1400px) {
    .userContainer {
      padding: 0px;
      .userContainer-body {
        height: 80%;
        width: 90%;
      }
    }
    .left-menu-item {
      padding-left: 10px;
    }
  }
</style>
