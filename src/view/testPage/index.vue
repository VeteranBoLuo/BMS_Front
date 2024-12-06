<template>
  <div style="display: flex; height: 100%">
    <div class="sidebar" :style="{ width: isCollapse ? '180px' : '250px' }">
      <el-menu v-model:selectedKeys="selectedKeys" >
        <template v-for="item in menuList" :key="item.name">
          <el-menu-item
            :style="{ background: router.currentRoute.value.name === item.key ? '#ccc' : '' }"
            :index="item.key"
            v-if="!item.isCollapse"
            @click="handleSelectMenu(item)"
          >
            <div class="item_content" :style="{ color: getColor() }">
              <span class="flex-center">
                <img style="height: 20px; width: 20px; margin-right: 10px" :src="item.icon" />
                <span>{{ item.name }}</span>
              </span>
            </div>
          </el-menu-item>
          <el-sub-menu v-else :index="item.key">
            <template #title>
              <span class="flex-center">
                <img style="height: 20px; width: 20px; margin-right: 10px" :src="item.icon" />
                <span>{{ item.name }}</span>
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :style="{
                  background: router.currentRoute.value.name === sItem.key ? '#ccc' : '',
                }"
                :index="sItem.key"
                v-for="sItem in item.children"
                @click="handleSelectMenu(sItem)"
              >
                <div class="item_content" :style="{ color: getColor() }">
                  <span class="flex-center">
                    <img style="height: 20px; width: 20px; margin-right: 10px" :src="sItem.icon" />
                    <span>{{ sItem.name }}</span>
                  </span>
                </div>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
    <div
      class="rightPane"
      :style="{ width: isCollapse ? 'calc(100% - 180px)' : 'calc(100% - 250px)' }"
    >
      <div class="rightPane_content">
        <router-view />
        <div class="footerTips"
          >用户协议 | 隐私政策 © 2024 Bl-Admin 川公网安备11010802042394号
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import home from '@/assets/icons/mainPage/home.svg';
  import workbench from '@/assets/icons/mainPage/workbench.svg';
  import CssAnimation from '@/assets/icons/mainPage/CssAnimation.svg';
  import functions from '@/assets/icons/mainPage/functions.svg';
  import dragOrder from '@/assets/icons/mainPage/dragOrder.svg';
  import dragMove from '@/assets/icons/mainPage/dragMove.svg';
  import fileUpload from '@/assets/icons/mainPage/fileUpload.svg';
  import CreateQrCode from '@/assets/icons/mainPage/CreateQrCode.svg';
  import components from '@/assets/icons/mainPage/components.svg';
  import RightMenu from '@/assets/icons/mainPage/RightMenu.svg';
  import LazyLoad from '@/assets/icons/mainPage/LazyLoad.svg';
  import VirtualListView from '@/assets/icons/mainPage/VirtualListView.svg';
  import jsonEditor from '@/assets/icons/mainPage/jsonEditor.svg';
  import chartRoom from '@/assets/icons/mainPage/chartRoom.svg';
  import g2Plot from '@/assets/icons/mainPage/g2Plot.svg';
  import Screenshot from '@/assets/icons/mainPage/Screenshot.svg';
  import test from '@/assets/icons/mainPage/test.svg';

  import router from '@/router';
  import { menuType } from '@/view/config';

  const isCollapse = ref(false);
  if (window.innerWidth < 600) {
    isCollapse.value = true;
  }

  const menuList: menuType[] = [
    {
      key: 'workbench',
      name: '工作台',
      icon: workbench,
    },
    {
      key: 'CssAnimation',
      name: 'CSS动画',
      icon: CssAnimation,
    },
    {
      key: 'functions',

      name: '功能',
      isCollapse: true,
      icon: functions,

      children: [
        {
          key: 'dragOrder',
          name: '元素交换顺序',
          icon: dragOrder,
        },
        {
          key: 'dragMove',
          name: '移动',
          icon: dragMove,
        },
        {
          key: 'fileUpload',
          name: '文件处理',
          icon: fileUpload,
        },
        {
          key: 'CreateQrCode',
          name: '二维码生成',
          icon: CreateQrCode,
        },
        {
          key: 'Screenshot',
          name: '框选截图',
          icon: Screenshot,
        },
      ],
    },
    {
      key: 'components',
      name: '组件',
      isCollapse: true,
      icon: components,

      children: [
        {
          key: 'RightMenu',
          name: '右键菜单',
          icon: RightMenu,
        },
        {
          key: 'g2Plot',
          name: 'g2Plot',
          icon: g2Plot,
        },
        {
          key: 'LazyLoad',
          name: '懒加载',
          icon: LazyLoad,
        },
        {
          key: 'VirtualListView',
          name: '虚拟列表',
          icon: VirtualListView,
        },
        {
          key: 'jsonEditor',
          name: 'json编辑器',
          icon: jsonEditor,
        },
        {
          key: 'chartRoom',
          name: '智能AI',
          icon: chartRoom,
        },
      ],
    },
    {
      key: 'test',
      name: '测试',
      icon: test,
    },
  ];

  const selectedKeys = ref([]);
  const currentNode = reactive({
    key: 'workbench',
    name: '工作台',
  });

  function handleSelectMenu({ name, key }) {
    currentNode.key = key;
    currentNode.name = name;
    router.push({ path: key });
  }

  function getColor() {
    return isCollapse.value ? 'white' : 'black';
  }

  onMounted(() => {
    const data = menuList.find((data) => {
      return data.key === router.currentRoute.value.name;
    });
    if (data?.key) {
      handleSelectMenu({ name: data.name, key: data.key });
    }
  });
</script>

<style scoped lang="less">
  .sidebar {
    height: 100%;
    transition: all 0.3s;
    overflow: hidden;
  }
  :deep(.el-menu) {
    border-right: 1px solid #ccc;
    height: 100%;
    width: 100%;
    overflow: auto;
    /*滚动条样式*/
    &::-webkit-scrollbar {
      width: 2px;
      height: 5px;
    }
    .el-menu--inline {
      border: 0;
    }
  }

  :deep(.el-sub-menu__title) {
    text-align: left;
    border-radius: 0;
    height: 55px !important;

    &:hover {
      background-color: #ccc;
    }
  }

  :deep(.el-menu-item) {
    text-align: left;
    height: 55px;
    width: 100%;
    border-radius: 0;
    box-sizing: border-box;

    &:hover {
      background-color: #ccc;
    }

    &:active {
      background-color: #ccc !important;
    }
  }

  :deep(.el-menu-title-content) {
    display: flex;
    align-items: center;
    width: 30px !important;
  }

  :deep(.el-menu-item-group__title) {
    display: none;
  }

  .rightPane {
    height: 100%;

    .rightPane_header {
      height: 50px;
      border-bottom: 1px solid #f1f2f3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 20px;
      box-sizing: border-box;
    }
  }

  .fold_css {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fold_icon {
    height: 18px;
    width: 18px;
    cursor: pointer;
  }

  .header_menu {
    display: flex;
    align-items: center;
  }

  .header_menu_ul {
    color: black;
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 2px;
    box-sizing: border-box;
    width: 100px;

    li {
      margin-bottom: 5px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #e8e9ea;
      }
    }
  }

  .item_content {
    display: flex;
    align-items: center;
  }

  .rightPane_content {
    height: 100%;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
  }

  .footerTips {
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
  }
</style>
