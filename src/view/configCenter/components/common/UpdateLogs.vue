<template>
  <PhoneContainer title="更新日志">
    <div style="color: white !important; padding: 20px">
      <a-timeline>
        <a-timeline-item color="#615ced" v-for="item in updateOptions"
          >{{ item.label }}
          <span style="font-size: 14px; color: #a0a0a0">{{ item.time }}</span>
          <div style="margin-bottom: -10px">
            <p v-for="(li, index) in item.list" style="font-size: 12px"> {{ index + 1 }}、{{ li }} </p>
          </div>
        </a-timeline-item>
      </a-timeline>
    </div>
  </PhoneContainer>
</template>
<script lang="ts" setup>
  import PhoneContainer from '@/components/phoneComponents/PhoneContainer/PhoneContainer.vue';

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
      label: '新增笔记模块，优化项目性能',
      time: '2025-01-24',
      list: [
        '引入全新的笔记模块，用户现在可以在应用内轻松创建、编辑和管理个人笔记;支持富文本编辑器；允许用户添加格式化文本、图片和列表',
        '提供标签系统，方便用户对笔记进行分类和搜索',
        '优化数据加载机制，减少初始加载时间和内存占用；增加缓存策略，加速重复操作的响应速度',
      ],
    },
    {
      label: '笔记可添加自定义标签',
      time: '2025-03-06',
    },
    {
      label: '“书签”模块左侧标签列表新增拖拽排序功能',
      time: '2025-03-28',
    },
  ];
</script>

<style lang="less" scoped>
  :deep(.ant-timeline .ant-timeline-item-tail) {
    background-color: var(--timeline-line-bg-color);
  }
</style>
