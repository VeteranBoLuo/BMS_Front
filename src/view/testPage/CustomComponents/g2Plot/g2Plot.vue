<template>
  <div class="container">
    <div style="width: 700px;">
      <a-tabs :active-key="activeName" @change="tabChange">
        <a-tab-pane key="Line" tab="折线图"> </a-tab-pane>
        <a-tab-pane key="Column" tab="柱状图"> </a-tab-pane>
        <a-tab-pane key="Area" tab="面积图"> </a-tab-pane>
      </a-tabs>
      <component style="width: 100%;box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);padding: 20px;border-radius: 5px" :is="componentName" :options="options" />
    </div>
    <code-des height="695px" style="margin-top: 20px; margin-left: 100px" :value="g2plotCode">
      <template #description>
        官网地址：<a target="_blank" href="https://g2plot.antv.antgroup.com/"
          >https://g2plot.antv.antgroup.com/</a
        >
          <br/>
        安装：npm install @antv/g2plot --save
      </template>
    </code-des>
  </div>
</template>

<script lang="ts" setup>
  import Line from '@/components/AntVG2Plot/Line.vue';
  import { ref } from 'vue';
  import Area from '@/components/AntVG2Plot/Area.vue';
  import Column from '@/components/AntVG2Plot/Column.vue';
  import CodeDes from '@/components/BasicComponents/CodeDes/CodeDes.vue';
  import { g2plotCode } from '@/view/common.ts';

  const componentName = ref(Line);
  const activeName = ref('Line');
  const components = {
    Line,
    Area,
    Column,
  };

  const options = {
    isGroup: true,
    xField: '月份',
    yField: '月均降雨量',
    seriesField: 'name',
    data: [
      {
        name: 'London',
        月份: 'Jan.',
        月均降雨量: 18.9,
      },
      {
        name: 'London',
        月份: 'Feb.',
        月均降雨量: 28.8,
      },
      {
        name: 'London',
        月份: 'Mar.',
        月均降雨量: 39.3,
      },
      {
        name: 'London',
        月份: 'Apr.',
        月均降雨量: 81.4,
      },
      {
        name: 'London',
        月份: 'May',
        月均降雨量: 47,
      },
      {
        name: 'London',
        月份: 'Jun.',
        月均降雨量: 20.3,
      },
      {
        name: 'London',
        月份: 'Jul.',
        月均降雨量: 24,
      },
      {
        name: 'London',
        月份: 'Aug.',
        月均降雨量: 35.6,
      },
      {
        name: 'Berlin',
        月份: 'Jan.',
        月均降雨量: 12.4,
      },
      {
        name: 'Berlin',
        月份: 'Feb.',
        月均降雨量: 23.2,
      },
      {
        name: 'Berlin',
        月份: 'Mar.',
        月均降雨量: 34.5,
      },
      {
        name: 'Berlin',
        月份: 'Apr.',
        月均降雨量: 99.7,
      },
      {
        name: 'Berlin',
        月份: 'May',
        月均降雨量: 52.6,
      },
      {
        name: 'Berlin',
        月份: 'Jun.',
        月均降雨量: 35.5,
      },
      {
        name: 'Berlin',
        月份: 'Jul.',
        月均降雨量: 37.4,
      },
      {
        name: 'Berlin',
        月份: 'Aug.',
        月均降雨量: 42.4,
      },
    ],
  };

  function tabChange(name) {
    activeName.value = name;
    componentName.value = components[name];
  }
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    width: 100%;
    color: white;
    top: 10px;
    position: relative;
    display: flex;
  }
</style>
