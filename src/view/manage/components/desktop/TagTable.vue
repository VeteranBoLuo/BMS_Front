<template>
  <b-loading :loading="loading">
    <div class="edit-tag-container">
      <h2>标签管理</h2>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px">
        <b-input v-model:value="tableSearchValue" class="table-search-input" />
        <b-space>
          <b-button
            v-click-log="{ module: '标签管理', operation: `新增` }"
            type="primary"
            @click="$router.push({ path: `/manage/editTag/add` })"
            >新增</b-button
          >
          <b-button @click="handleToBack" v-click-log="{ module: '标签管理', operation: `返回` }">返回</b-button>
        </b-space>
      </div>
      <a-table
        style="width: 90vw; margin-top: 5px"
        :data-source="tagList"
        :columns="tagColumns"
        row-key="id"
        :pagination="false"
        :scroll="{ y: bookmark.screenHeight - 300 }"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <span style="display: flex; align-items: center; gap: 10px">
              <svg-icon :src="record.iconUrl" />
              {{ text }}
            </span>
          </template>
          <template v-else-if="column.dataIndex === 'associatedTagIds'">
            <div>
              <div style="display: flex; align-items: center; gap: 10px">
                <div :title="tag.name" class="common-tag" v-for="tag in record.associatedTagList" :key="tag.id">
                  {{ tag.name }}
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'bookmarkList'">
            <div class="text-hidden">
              <span :title="b.name" class="common-tag" style="margin-right: 10px" v-for="b in record.bookmarkList" :key="b.id">
                {{ b.name }}
              </span>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="edit-tag-operation">
              <svg-icon
                title="编辑"
                :src="icon.table_edit"
                v-click-log="{ module: '标签管理', operation: `编辑标签` }"
                size="16"
                @click="edit(record.id)"
                class="dom-hover"
              />
              <svg-icon
                title="删除"
                :src="icon.table_delete"
                size="16"
                @click="handleDeleteTag(record)"
                v-click-log="{ module: '标签管理', operation: `删除标签` }"
                class="dom-hover"
              />
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </b-loading>
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import { computed, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { apiBasePost, apiQueryPost } from '@/http/request.ts';
  import Alert from '@/components/BasicComponents/BModal/Alert.ts';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import router from '@/router';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import icon from '@/config/icon.ts';
  import BSpace from '@/components/BasicComponents/BSpace/BSpace.vue';
  import BLoading from '@/components/BasicComponents/BLoading/BLoading.vue';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';

  const visible = defineModel<boolean>('visible');

  const bookmark = bookmarkStore();
  const loading = ref(false);
  const tagColumns = computed(() => {
    let columns = [
      {
        title: '标签',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        ellipsis: true,
        width: 100,
      },
    ];
    if (!bookmark.isPhone) {
      {
        columns.splice(
          1,
          0,
          {
            title: '相关标签',
            dataIndex: 'associatedTagIds',
            ellipsis: true,
          },
          {
            title: '关联书签',
            dataIndex: 'bookmarkList',
            ellipsis: true,
          },
        );
      }
    }
    return columns;
  });

  const edit = (id: string) => {
    router.push({ path: `/manage/editTag/${id}` });
  };

  function handleDeleteTag(tag) {
    Alert.alert({
      title: '提示',
      content: `请确认是否要删除标签【${tag.name}】？`,
      onOk() {
        apiBasePost('/api/bookmark/delTag', {
          id: tag.id,
        }).then((res) => {
          if (res.status == 200) {
            message.success('删除成功');
            init();
          }
        });
      },
    });
  }

  function handleToBack() {
    if (bookmark.isPhone) {
      router.push('/personCenter');
    } else {
      router.push('/home');
    }
  }
  const tableSearchValue = ref('');
  const tagList = computed(() => {
    if (tableSearchValue.value) {
      return tableData.value.filter((data: any) => {
        return data.name.toLowerCase().includes(tableSearchValue.value.toLowerCase());
      });
    } else {
      return tableData.value;
    }
  });
  init();
  const tableData = ref([{}]);
  function init() {
    loading.value = true;
    apiQueryPost('/api/bookmark/queryTagList', {
      filters: {
        userId: localStorage.getItem('userId'),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          tableData.value = res.data;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
</script>

<style lang="less" scoped>
  .edit-tag-container {
    padding: 0 40px;
    position: absolute;
    top: 20px;
    box-sizing: border-box;
  }
  .edit-tag-operation {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .table-search-input {
    width: 30%;
  }
</style>
