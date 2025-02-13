<template>
  <div class="note-library-container">
    <div class="note-library-header" v-if="bookmark.isPhone">
      <div class="header-content">
        <div class="back-icon" @click="router.back()">
          <SvgIcon :src="icon.noteDetail.back" />
        </div>
        <div style="font-weight: 500; font-size: 20px">笔记库</div>
      </div>
      <b-button
        type="primary"
        style="border-radius: 20px"
        @click="router.push('/noteLibrary/add')"
        v-click-log="{ module: '笔记', operation: '新建笔记' }"
      >
        + 新建笔记
      </b-button>
    </div>
    <div v-else class="flex-align-center" style="justify-content: space-between; padding: 0 20px">
      <div style="font-weight: 500; font-size: 20px">笔记库</div>
      <b-button
        type="primary"
        style="border-radius: 20px"
        @click="router.push('/noteLibrary/add')"
        v-click-log="{ module: '笔记', operation: '新建笔记' }"
      >
        + 新建笔记
      </b-button>
    </div>
    <div class="note-library-body">
      <div
        v-for="note in noteList"
        @click="router.push(`/noteLibrary/${note.id}`)"
        class="note-card"
        :style="{ boxShadow: bookmark.theme === 'day' ? 'rgb(237, 242, 250) 0px 0px 10px' : 'unset' }"
      >
        <div class="note-title" :title="note.title">{{ note.title }}</div>
        <div
          class="note-content"
          :style="{ color: bookmark.theme === 'day' ? 'rgb(102, 102, 102)' : '#ccc' }"
          v-html="extractAndConvertTags(note.content)"
        />
        <div class="note-tags">
          <div class="b-tag" @click.stop>标签开发中</div>
          <div class="b-tag" @click.stop>测试标签</div>
        </div>
        <div
          :style="{ color: bookmark.theme === 'day' ? 'rgb(102, 102, 102)' : '#ccc' }"
          style="font-size: 12px; margin-top: 10px"
          >{{ note['updateTime'] ?? note['createTime'] }}</div
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import router from '@/router';
  import { apiBasePost } from '@/http/request.ts';
  import { ref } from 'vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import { bookmarkStore } from '@/store';
  const bookmark = bookmarkStore();
  const noteList = ref([]);
  apiBasePost('/api/note/queryNoteList').then((res) => {
    if (res.status === 200) {
      noteList.value = res.data ?? [];
    }
  });

  // 提取<h>和<p>标签等并转换为<p>标签
  const extractAndConvertTags = (htmlContent: string) => {
    // 创建一个临时的DOM元素
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;

    // 获取所有的<h>和<p>标签
    const allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'];
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
</script>

<style lang="less" scoped>
  .note-library-container {
    padding: 20px;
    width: 100%;
    height: 100%;
    border-top: 1px solid var(--notePage-topBody-border-color);
    box-sizing: border-box;
  }

  .note-library-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
  .note-library-body {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 30px;
    overflow: auto;
  }
  .note-card {
    height: 300px;
    border-radius: 8px;
    border: 1px solid #edf2fa;
    padding: 20px;
    box-sizing: border-box;
  }

  .note-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 0%;
    margin-right: 8px;
    cursor: pointer;
  }

  .note-content {
    color: #666;
    font-size: 12px;
    line-height: 1rem;
    height: 180px;
    overflow: hidden;
  }

  .note-tags {
    margin-top: 10px;
    display: flex;
    gap: 10px;

    .b-tag {
      background-color: #eeedff;
      padding: 2px 4px;
      border-radius: 6px;
      font-size: 14px;
      color: #8b88f2;
    }
  }

  @media (max-width: 600px) {
    .note-library-body {
      padding: 0;
    }
  }
  .back-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    cursor: pointer;
    border: 1px solid #e8eaf2;
  }
</style>
