<template>
  <div style="padding: 20px; width: 100%; display: flex">
    <div class="note-library-body">
      <div
        v-for="item in 20"
        @click="router.push(`/noteLibrary/${item}`)"
        style="
          height: 300px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px #edf2fa;
          padding: 20px;
          box-sizing: border-box;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1 1 0%;
            margin-right: 8px;
            cursor: pointer;
          "
          >欢迎使用云笔记</div
        >
        <div style="margin-top: 20px; font-size: 14px; line-height: 22px; color: rgb(102, 102, 102)">
          在这个信息爆炸的时代，高效产出优质内容成为越来越多创作者的追求。
          无论你是学生、写作爱好者、内容创作者，还是忙碌的职场人士，AI都能成为你的得力助手。 本篇文章将带你探索
          如何利用通
        </div>
        <div style="margin-top: 20px; display: flex; gap: 10px">
          <div
            style="
              background-color: #eeedff;
              padding: 2px 4px;
              border-radius: 6px;
              font-size: 14px;
              color: var(--text-color);
            "
            >示例笔记</div
          >
          <div
            style="
              background-color: #eeedff;
              padding: 2px 4px;
              border-radius: 6px;
              font-size: 14px;
              color: var(--text-color);
            "
            >教程</div
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BList from '@/components/BasicComponents/BList/BList.vue';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import RightMenu from '@/components/RightMenu.vue';
  import router from '@/router';

  const categoryList = [
    { name: '示例笔记', id: '示例笔记' },
    { name: '教程', id: '教程' },
  ];
</script>

<style lang="less">
  .note-library-body {
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 30px;
    overflow: auto;
  }
</style>
