<template>
  <div style="padding: 20px; width: 100%; border-top: 1px solid #ccc">
    <div class="flex-align-center" style="justify-content: space-between; padding: 0 20px">
      <div style="font-weight: 500; font-size: 20px">笔记库</div>
      <b-button type="primary" style="border-radius: 20px" @click="router.push('/noteLibrary/add')">
        + 新建笔记
      </b-button>
    </div>
    <div class="note-library-body">
      <div
        v-for="note in noteList"
        @click="router.push(`/noteLibrary/${note.id}`)"
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
          :title="note.title"
          >{{ note.title }}</div
        >
        <div
          style="font-size: 12px; line-height: 1rem; color: rgb(102, 102, 102); height: 180px; overflow: hidden"
          v-html="extractAndConvertTags(note.content)"
        />
        <div style="margin-top: 10px; display: flex; gap: 10px">
          <div
            style="background-color: #eeedff; padding: 2px 4px; border-radius: 6px; font-size: 14px; color: #8b88f2"
            @click.stop
            >标签开发中</div
          >
          <div
            style="background-color: #eeedff; padding: 2px 4px; border-radius: 6px; font-size: 14px; color: #8b88f2"
            @click.stop
            >测试标签</div
          >
        </div>
        <div style="color: rgb(102, 102, 102); font-size: 12px; margin-top: 10px">{{
          note.updateTime ?? note.createTime
        }}</div>
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
  import { apiBasePost } from '@/http/request.ts';
  import { onMounted, ref } from 'vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';

  const noteList = ref([]);
  apiBasePost('/api/note/queryNoteList').then((res) => {
    if (res.status === 200) {
      noteList.value = res.data ?? [];
    }
  });

  // 提取<h>和<p>标签并转换为<p>标签
  const extractAndConvertTags = (htmlContent: string) => {
    // 创建一个临时的DOM元素
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;

    // 获取所有的<h>和<p>标签
    const allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const extractedContent = Array.from(tempElement.querySelectorAll('*'))
      .filter((el) => allowedTags.includes(el.tagName.toLowerCase()))
      .map((el) => {
        // 移除元素的样式和类属性
        el.removeAttribute('style');
        el.removeAttribute('class');

        // 将<h>标签转换为<p>标签
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(el.tagName.toLowerCase())) {
          const newElement = document.createElement('p');
          newElement.innerHTML = el.innerHTML;
          return newElement.outerHTML;
        }
        return el.outerHTML;
      })
      .join('');

    return extractedContent;
  };
  onMounted(() => {
    document.documentElement.setAttribute('data-theme', 'day');
  });
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
