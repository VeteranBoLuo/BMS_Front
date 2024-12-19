<template>
  <b-loading :loading="loading">
    <PhoneContainer :title="title">
      <div class="edit-list-container">
        <b-input v-model:value="searchValue" class="table-search-input" :placeholder="placeholder">
          <template #prefix>
            <svg-icon color="#cccccc" :src="icon.navigation_search" size="16" />
          </template>
        </b-input>
        <div class="list-body">
          <div v-for="item in dataList" class="list-item flex-align-center">
            <slot name="item" :data="item" />
          </div>
        </div>
        <b-button
          class="footer-center"
          style="width: 80%; margin-top: 15px; border-radius: 80px"
          type="primary"
          @click="$emit('add')"
          >新增</b-button
        >
      </div>
    </PhoneContainer>
  </b-loading>
</template>

<script lang="ts" setup>
  import { bookmarkStore } from '@/store';
  import { computed, ref } from 'vue';
  import { apiQueryPost } from '@/http/request.ts';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import BLoading from '@/components/BasicComponents/BLoading/BLoading.vue';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import PhoneContainer from '@/components/PhoneContainer/PhoneContainer.vue';
  import icon from '@/config/icon.ts';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容',
    },
    listData: {
      type: Array,
      default: () => [],
    },
  });
  const visible = defineModel<boolean>('visible');

  const bookmark = bookmarkStore();
  const loading = ref(false);

  const searchValue = ref('');
  const dataList = computed(() => {
    if (searchValue.value) {
      return props.listData.filter((data: any) => {
        return data.name.toLowerCase().includes(searchValue.value.toLowerCase());
      });
    } else {
      return props.listData
    }
  });
</script>

<style lang="less" scoped>
  .edit-list-container {
    height: 100%;
    box-sizing: border-box;
  }
  .edit-list-operation {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .table-search-input {
    width: 100%;
  }
  .list-body {
    margin-top: 10px;
    height: calc(100% - 92px);
    overflow: auto;
    border-radius: 8px;
  }
  .list-item {
    position: relative;
    gap: 10px;
    height: 44px;
    padding-left: 10px;
    border-bottom: 1px solid var(--person-menu-item-border-color);
  }
</style>
