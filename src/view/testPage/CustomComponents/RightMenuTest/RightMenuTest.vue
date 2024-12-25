<template>
  <div class="menu_style">
    <div v-for="(item, index) in list" :key="item.label">
      <right-menu :menu="item.menu" @select="handleSelectItem">
        <div
          style="
            height: 100px;
            width: 300px;
            box-shadow: 0 0 6px rgba(000, 000, 000, 20%);
            padding-top: 10px;
            box-sizing: border-box;
            border-radius: 4px;
          "
        >
          {{ item.label }}
        </div>
      </right-menu>
    </div>
  </div>
</template>

<script setup>
  import RightMenu from '@/components/RightMenu.vue';
  import { message } from 'ant-design-vue';
  import { ref } from 'vue';

  const list = ref([
    {
      label: '工作台',
      menu: ['删除', '测试', '获取', '重命名'],
    },
    {
      label: '平台侧',
      menu: ['33删除', '测试', '获取', '重命名'],
    },
    {
      label: '语料',
      menu: ['删22除', '测试', '获取', '重命名'],
    },
    {
      label: '测试集合',
      menu: ['删1231除', '测试', '获取', '重命名'],
    },
  ]);

  function handleSelectItem(e) {
    message.success(e);
  }
</script>
<style scoped>
  .menu_style {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(000, 000, 000, 20%);
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    gap: 10px;
  }
</style>
