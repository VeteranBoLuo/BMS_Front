<template>
  <a-dropdown :trigger="['click']" v-model:open="filterVisible" placement="bottomRight">
    <b-button
      class="noteType-select"
      :style="{
        background: filterVisible ? 'var(--noteType-hover-bg-color)' : '',
        color: filterVisible ? 'var(--noteType-hover-color)' : '',
      }"
      v-click-log="OPERATION_LOG_MAP.noteLibrary.filterNote"
    >
      {{ viewNoteFilter }}<svg-icon :src="icon.arrow_left" :style="{ rotate: filterVisible ? '-90deg' : '90deg' }" />
    </b-button>
    <template #overlay>
      <div class="filter-container">
        <div class="filter-item" @click.stop="viewNote('all')" :isFocus="noteType === 'all' ? true : false"
          >全部笔记</div
        >
        <div class="filter-item" @click.stop="viewNote('null')" :isFocus="noteType === 'null'">无标签笔记</div>
        <div style="width: 100%; height: 1px; background: #f0f0f0; flex-shrink: 0"></div>
        <div :title="item" v-for="item in allTags" class="filter-item" @click.stop="viewNote(item)" :isFocus="noteType === item">
          <span class="text-hidden"> # {{ item }} </span>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/base/SvgIcon/src/SvgIcon.vue';
  import BButton from '@/components/base/BasicComponents/BButton.vue';
  import { computed, ref } from 'vue';
  import { OPERATION_LOG_MAP } from '@/config/logMap.ts';

  defineProps({
    allTags: {
      type: Array,
      default: () => [],
    },
  });

  const filterVisible = ref(false);

  const viewNoteFilter = computed(() => {
    if (noteType.value === 'all') {
      return '全部笔记';
    }
    if (noteType.value === 'null') {
      return '无标签笔记';
    }
    return noteType.value;
  });

  const noteType = defineModel('noteType');

  function viewNote(type?: 'all' | 'null' | any) {
    noteType.value = type;
  }
</script>

<style lang="less" scoped>
  .noteType-select {
    position: relative;
    border-radius: 36px !important;
    border: 1px solid #e8eaf2 !important;
    background-color: var(--background-color);
    display: flex;
    gap: 5px;
    &:hover {
      background-color: var(--noteType-hover-bg-color);
      color: var(--noteType-hover-color);
    }
  }
  .filter-container {
    width: 200px;
    max-height: 300px;
    padding: 5px;
    background: var(--menu-cintainer-bg-color);
    box-shadow: 1px 1px 5px #4d5264;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: auto;
  }
  .filter-item {
    text-align: left;
    color: var(--desc-color);
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    cursor: pointer;
    @media (min-width: 600px) {
      &:hover {
        background: #eeedff;
        color: #605ce5;
      }
    }
  }
  [isFocus='true'] {
    background: #eeedff;
    color: #605ce5;
  }
</style>
