<template>
  <PhoneContainer title="操作日志">
    <div style="overflow: hidden; height: 100%; box-sizing: border-box">
      <b-space style="width: 100%">
        <b-input
          v-model:value="searchValue"
          placeholder="用户名或接口名..."
          @input="handleSearch"
        >
          <template #prefix>
            <svg-icon :src="icon.navigation_search" size="16" />
          </template>
        </b-input>
        <b-button @click="clearOperationLogs" type="primary">清空</b-button>
      </b-space>
      <a-table
        :data-source="logList"
        :columns="logColumns"
        row-key="id"
        style="margin-top: 5px"
        :scroll="{ y: bookmark.screenHeight - 250 }"
        :pagination="false"
      >
        <template #expandedRowRender="{ record }">
          <div layout="vertical" style="overflow: auto; height: 300px; color: var(--text-color)">
            <div label="module">操作人员：{{ record.userName }}</div>
            <div label="module">模块：{{ record.module }}</div>
            <div label="operation">操作：{{ record.operation }}</div>
            <div label="requestTime">时间：{{ record.createTime }}</div>
            <div label="operation">系统：{{ record.os }}</div>
            <div label="requestTime">浏览器：{{ record.browser }}</div>
          </div>
        </template>
      </a-table>
      <a-pagination
        :current="currentPage"
        :page-size="pageSize"
        show-size-changer
        size="small"
        style="margin-top: 10px"
        :total="total"
        :show-total="(total) => `总计 ${total} 条`"
        @change="onChange"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
  </PhoneContainer>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { apiBaseGet, apiQueryPost } from '@/http/request.ts';
  import { bookmarkStore } from '@/store';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import Alert from '@/components/BasicComponents/BModal/Alert.ts';
  import { message } from 'ant-design-vue';
  import BSpace from '@/components/BasicComponents/BSpace/BSpace.vue';
  import PhoneContainer from '@/components/phoneComponents/PhoneContainer/PhoneContainer.vue';
  import router from '@/router';
  const bookmark = bookmarkStore();
  const logList = ref([]);

  const logColumns = computed(() => {
    if (bookmark.isPhone) {
      return [
        {
          title: '操作人员',
          dataIndex: 'userName',
          ellipsis: true,
        },
        {
          title: '操作名称',
          dataIndex: 'operation',
          ellipsis: true,
        },
      ];
    }
    return [
      {
        title: '操作人员',
        dataIndex: 'userName',
        ellipsis: true,
      },
      {
        title: '模块',
        dataIndex: 'module',
        ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        ellipsis: true,
      },
      {
        title: '时间',
        dataIndex: 'createTime',
        ellipsis: true,
      },
      {
        title: '系统',
        dataIndex: 'os',
        ellipsis: true,
      },
      {
        title: '浏览器',
        dataIndex: 'browser',
        ellipsis: true,
      },
    ];
  });

  const currentPage = ref<number>(1);
  const pageSize = ref<number>(20);
  const onChange = (page: number, newPageSize: number) => {
    if (newPageSize !== pageSize.value) {
      currentPage.value = 1;
    } else {
      currentPage.value = page;
    }
    pageSize.value = newPageSize;
    searchApiLog();
  };

  function clearOperationLogs() {
    Alert.alert({
      title: '提示',
      content: `请确认是否要清空操作日志？`,
      onOk() {
        apiBaseGet('/api/common/clearOperationLogs', {}).then((res) => {
          if (res.status === 200) {
            message.success('日志清空成功');
            searchApiLog();
          }
        });
      },
    });
  }

  const timer = ref();
  function handleSearch() {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
      searchApiLog();
    }, 500);
  }

  const total = ref(0);
  const searchValue = ref('');
  function searchApiLog() {
    apiQueryPost('/api/common/getOperationLogs', {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      filters: {
        key: searchValue.value,
      },
    }).then((res) => {
      if (res.status === 200) {
        logList.value = res.data.items;
        total.value = res.data.total;
      }
    });
  }
  onMounted(() => {
    searchApiLog();
  });
</script>

<style lang="less" scoped>
  :deep(.ant-table-container) {
    border: 1px solid var(--icon-color);
    border-radius: 8px;
    overflow: hidden;
  }
  :deep(.ant-table-wrapper .ant-table) {
    background-color: var(--background-color);
    color: var(--text-color);
  }
  :deep(.ant-table-cell-ellipsis) {
    background-color: var(--background-color) !important;
    color: var(--text-color) !important;
  }
  :deep(.ant-table-cell-scrollbar) {
    background-color: unset !important;
    display: none;
  }
  :deep(.ant-table-cell) {
    background-color: var(--background-color) !important;
    color: black;
  }
  :deep(.ant-select-dropdown-placement-topLeft) {
    min-width: 100px !important;
    transition: none !important;
  }
  :deep(.ant-select-selector .ant-select-selection-item) {
    background-color: unset !important;
    transition: none !important;
  }
  :deep(.ant-select-selector) {
    transition: none !important;
  }
  /*--分页背景调色--*/
  :deep(.ant-pagination) {
    color: var(--text-color);
  }
  :deep(.ant-pagination-item a) {
    color: var(--text-color);
  }
  :deep(.ant-pagination-item-active a) {
    color: #4e4b46;
  }
  :deep(.ant-pagination-item-ellipsis) {
    color: var(--icon-color) !important;
  }

</style>
