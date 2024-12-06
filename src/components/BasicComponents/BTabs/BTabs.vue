<template>
  <div class="tab_body" ref="tabsRef">
    <div class="tab_title">
      <div
        class="tabs-tab"
        v-for="(item, index) in titles"
        :key="item.name"
        @click="changeActKey(item.name)"
        :class="{
          'active-style': item.name === actName,
          turn_left: item.name === actName && direction === 'left',
          turn_right: item.name === actName && direction === 'right',
        }"
        >{{ item.label }}</div
      >
    </div>
    <div class="tab_line"></div>
    <!--所有pane组件使用的slot容器-->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { provide, ref, useSlots } from 'vue';
  const emit = defineEmits(['change']);
  const props = defineProps({
    activeName: {
      type: String,
      default: '',
    },
  });
  const slots: any = useSlots();
  // 获取 slots 里的 name 和 title
  const panels = slots.default();
  const titles = panels.map((child) => {
    const { props = {} } = child;
    const { name, label } = props;
    return {
      name,
      label,
    };
  });
  // 当前 actKey
  const actName = ref(props.activeName);
  provide('actName', actName);

  const direction = ref('');
  function changeActKey(name) {
    const lastIndex = titles.findIndex((data) => data.name === actName.value);
    const nextIndex = titles.findIndex((data) => data.name === name);
    if (lastIndex > nextIndex) {
      direction.value = 'left';
    } else if (lastIndex < nextIndex) {
      direction.value = 'right';
    } else {
      direction.value = '';
    }
    actName.value = name;
    emit('change', name); // 触发回调函数
  }
</script>

<style scoped lang="less">
  .tab_body {
    padding: 4px 20px 50px 20px;
    text-align: left;
    .tab_title {
      display: flex;
    }
    .tab_line {
      height: 1px;
      width: 100%;
      background-color: #f0f0f0;
    }
  }
  .tabs-tab {
    cursor: pointer;
    margin-right: 10px;
    height: 30px;
  }
  .active-style {
    color: #535bf2;
    border-bottom: 2px solid;
    width: max-content;
  }
  .turn_left {
    animation: left 0.3s ease-in-out; /* 应用关键帧动画 */
  }
  .turn_right {
    animation: right 0.3s ease-in-out; /* 应用关键帧动画 */
  }
  @keyframes left {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes right {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
