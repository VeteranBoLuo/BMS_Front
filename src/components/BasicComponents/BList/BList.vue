<template>
  <div class="list-container">
    <slot name="input">
      <b-input v-model:value="searchValue" :placeholder="placeholder" v-if="searchFilter" />
    </slot>
    <div  class="menu-body" :style="{ marginTop: hasInputSlot ? '10px' : '' }">
      <div :key="item[nodeType.id]" v-for="item in viewList" @click="nodeClick(item)">
        <slot name="item" :item="item">
          <div
            class="menu-item"
            :title="item[nodeType.title]"
            :style="{
              backgroundColor:
                String(nodeCheckId) === String(item[nodeType.id])
                  ? 'var(--category-item-ba-color)'
                  : '',
            }"
          >
            <slot name="icon" :item="item"> </slot>
            <span
              class="text-hidden"
              :style="{ width: hasIconSlot ? 'calc(100% - 28px)' : '100%' }"
            >
              <slot name="title" :item="item">
                {{ item[nodeType.title] }}
              </slot>
            </span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import { computed, ref, watch, useSlots } from 'vue';

  const props = withDefaults(
    defineProps<{
      nodeType: {
        id: string | number;
        title: string;
      };
      checkId: string | number;
      placeholder: string;
      listOptions: any;
      searchFilter: boolean; // 启动自带input过滤功能
      iconVisible: boolean;
    }>(),
    {
      nodeType: () => ({
        id: 'id',
        title: 'title',
      }),
      placeholder: '请输入',
      checkId: '',
      searchFilter: false,
    },
  );
  const searchValue = ref('');
  const viewList = computed<{ [key: string]: any }[]>(() => {
    if (!searchValue.value || props.searchFilter === false) {
      return props.listOptions;
    }
    return props.listOptions.filter((item: any) => {
      return item[props.nodeType.title].toUpperCase().includes(searchValue.value.toUpperCase());
    });
  });
  const emit = defineEmits(['node-click']);
  const nodeCheckId = ref(props.checkId);
  function nodeClick(item) {
    nodeCheckId.value = item[props.nodeType.id];
    emit('node-click', item);
  }

  // 获取插槽内容
  const slots = useSlots();
  // 计算属性来判断是否有内容传递给 input 插槽
  const hasInputSlot = computed(() => {
    return !!slots.input;
  });

  const hasIconSlot = computed(() => {
    return !!slots.icon;
  });

  watch(
    () => props.checkId,
    (val) => {
      nodeCheckId.value = val;
    },
  );
</script>

<style lang="less">
  .list-container {
    height: 100%;
    width: 100%;
  }
  .menu-body {
    height: calc(100% - 42px);
    overflow-y: auto;
  }
  .menu-item {
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: 10px;

    &:hover {
      background-color: var(--category-item-ba-color);
    }
  }
</style>
