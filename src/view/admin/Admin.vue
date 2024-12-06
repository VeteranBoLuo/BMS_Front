<template>
  <div class="admin-container">
    <div class="menu-body">
      <BList
        style="font-size: 12px"
        :listOptions="viewOptions"
        @nodeClick="nodeClick"
        :check-id="checkId"
      >
        <template #icon="{ item }">
          <svg-icon :src="item.icon" />
        </template>
      </BList>
    </div>
    <div class="admin-view-panel">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon';
  import BList from '@/components/BasicComponents/BList/BList.vue';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { computed, onMounted, ref } from 'vue';
  import router from '@/router';
  const checkId = ref('operationLog');
  const viewOptions = ref([
    {
      id: 'operationLog',
      title: '操作日志',
      icon: icon.userCenter_OperationLog,
    },
    {
      id: 'apiLog',
      title: 'api日志',
      icon: icon.userCenter_log,
    },
    {
      id: 'userMg',
      title: '用户管理',
      icon: icon.navigation_user,
    },
  ]);

  function nodeClick(menu: any) {
    router.push('/admin/' + menu.id);
  }
  onMounted(() => {
    checkId.value = router.currentRoute.value.fullPath.split('/').pop();
  });
</script>

<style lang="less" scoped>
  .admin-container {
    display: flex;
    gap: 10px;
    padding: 20px;
    box-sizing: border-box;
  }
  .menu-body {
    width: 200px;
  }
  .admin-view-panel {
    width: calc(100% - 210px);
  }
  @media (max-width: 600px) {
    .admin-container {
      padding: unset;
      display: flex;
      gap: 10px;
      padding: 5px;
    }
    .menu-body {
      width: 100px;
      overflow: hidden auto;
    }
    .admin-view-panel {
      width: calc(100% - 110px);
    }
  }
</style>
