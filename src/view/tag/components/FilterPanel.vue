<template>
  <div class="filter-panel">
    <b-list class="header-input" :list-options="filterTagList" :node-type="{ id: 'id', title: 'name' }">
      <template #input>
        <b-input placeholder="请输入标签名" v-model:value="tagName">
          <template #suffix>
            <a-dropdown :trigger="['hover']" class="flex-align-center">
              <template #overlay>
                <a-menu style="background-color: var(--menu-body-bg-color)">
                  <a-menu-item :style="{ color: bookmark.iconColor }" key="addTag" @click="addTag" class="menu-item">
                    <span v-click-log="{ module: '首页', operation: `点击添加标签` }"> 添加标签 </span>
                  </a-menu-item>
                  <a-menu-item
                    :style="{ color: bookmark.iconColor }"
                    class="menu-item"
                    key="editTag"
                    @click="addBookmark"
                  >
                    <span v-click-log="{ module: '首页', operation: `点击添加书签` }"> 添加书签 </span>
                  </a-menu-item>
                </a-menu>
              </template>
              <span>
                <svg-icon :src="icon.filter_panel_list" size="20" />
              </span>
            </a-dropdown> </template
        ></b-input>
      </template>
      <template #item="{ item }">
        <RightMenu
          :menu="['添加书签', '重命名', '编辑', '删除']"
          @select="handleTagMenu($event, <TagInterface>item)"
          v-if="!item.isRename"
        >
          <div
            class="category-item"
            :title="item.name"
            :style="{
              backgroundColor: bookmark.tagData?.id === item.id ? 'var(--category-item-ba-color)' : '',
            }"
            :key="item"
            v-click-log="{ module: '首页', operation: `查询标签【${item.name}】下的书签列表` }"
            @click="handleClickTag(<TagInterface>item)"
          >
            <svg-icon size="18" :src="item.iconUrl" />
            <span class="text-hidden" style="width: calc(100% - 28px)">{{ item.name }}</span>
          </div>
        </RightMenu>
        <b-input class="edit-input" v-else v-model:value="newName">
          <template #suffix>
            <svg-icon
              :src="icon.filter_panel_check"
              size="18"
              @click="handleRename(<TagInterface>item)"
              class="dom-hover"
            />
          </template>
        </b-input>
      </template>
    </b-list>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { apiBasePost } from '@/http/request';
  import { bookmarkStore, useUserStore } from '@/store';
  import { useRouter } from 'vue-router';
  import RightMenu from '@/components/RightMenu.vue';
  import { TagInterface } from '@/config/bookmarkCfg';
  import { message } from 'ant-design-vue';
  import Alert from '@/components/BasicComponents/BModal/Alert';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import icon from '@/config/icon.ts';
  import BList from '@/components/BasicComponents/BList/BList.vue';

  const tagName = ref('');
  const filterTagList = computed(() => {
    return bookmark.tagList.filter((item) => item.name.toUpperCase().indexOf(tagName.value.toUpperCase()) > -1);
  });
  const user = useUserStore();
  const bookmark = bookmarkStore();
  const router = useRouter();

  const newName = ref('');
  const rightTagData = ref<TagInterface>();

  function handleTagMenu(menu, tag: TagInterface) {
    rightTagData.value = tag;
    if (menu === '重命名') {
      tag.isRename = true;
      newName.value = tag.name;
    } else if (menu === '编辑') {
      router.push(`/manage/editTag/${tag.id}`);
    } else if (menu === '删除') {
      Alert.alert({
        title: '提示',
        content: `请确认是否要删除标签【${tag.name}】？`,
        onOk() {
          apiBasePost('/api/bookmark/delTag', {
            id: tag.id,
          }).then((res) => {
            if (res.status == 200) {
              message.success('删除成功');
              if (tag.id === router.currentRoute.value.params?.id) {
                bookmark.type = 'all';
              }
              bookmark.refreshTag();
            }
          });
        },
      });
    } else {
      router.push(`/manage/editBookmark/add/${tag.id}`);
    }
  }

  function handleRename(tag: TagInterface) {
    if (newName.value) {
      apiBasePost('/api/bookmark/updateTag', {
        name: newName.value,
        id: tag.id,
      }).then((res) => {
        if (res.status == 200) {
          tag.isRename = !tag.isRename;
          message.success('重命名成功');
          bookmark.refreshTag();
        }
      });
    }
  }

  function addBookmark() {
    router.push('/manage/editBookmark/add');
  }

  function addTag() {
    router.push('/manage/editTag/add');
  }

  function handleClickTag(tag: TagInterface) {
    if (tag.id === router.currentRoute.value.params?.id) {
      bookmark.refreshTag();
    } else {
      bookmark.type = 'normal';
      router.push({ path: `/home/${tag.id}` });
    }
  }
</script>

<style lang="less" scoped>
  .filter-panel {
    min-width: 180px;
    height: 100%;
  }

  .header-input {
    width: 180px;
  }

  .edit-input {
    :deep(.b_input) {
      height: 30px !important;
    }
  }

  .filter-panel-menu {
    height: calc(100% - 53px);
    padding-right: 10px;
    width: 180px;
    overflow: hidden auto;
  }

  @media (max-width: 600px) {
    .filter-panel {
      min-width: unset;
      width: 100%;
      padding: 20px;
    }

    &.header-input {
      width: unset;
    }

    .category-item {
      width: 100%;
      &:hover {
        background-color: unset;
      }
    }

    .filter-panel-menu {
      width: unset;
      padding-right: unset;
    }
  }
</style>