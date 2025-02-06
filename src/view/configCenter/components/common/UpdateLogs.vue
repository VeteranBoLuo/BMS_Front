<template>
  <div style="color: white !important">
    <a-timeline>
      <a-timeline-item color="#615ced" v-for="item in updateOptions"
        >{{ item.label }}
        <span style="font-size: 14px; color: #a0a0a0">{{ item.time }}</span>
        <div style="margin-bottom: -10px">
          <p v-for="(li, index) in item.list" style="font-size: 12px">{{ ++index }}、{{ li }}</p>
        </div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
<script lang="ts" setup>
  const updateOptions = [
    {
      label: '功能优化',
      time: '2024-12-09',
      list: [
        '首页搜索书签功能新增可根据书签的关联标签查询',
        '标签的图标新增本地上传方式',
        '首页书签和标签新增右键快捷菜单',
      ],
    },
    {
      label: '新增主题切换功能',
      time: '2024-12-10',
    },
    {
      label: '新增帮助中心模块',
      time: '2024-12-13',
    },
    {
      label: '新增意见反馈模块',
      time: '2024-12-17',
    },
    {
      label: '书签可导出为excel',
      time: '2025-01-20',
    },
    {
      label: '重大更新，',
      time: '2025-01-24',
      list: ['新增笔记模块', '优化项目性能'],
    },
  ];
</script>

<style lang="less"></style>
