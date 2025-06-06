<template>
  <b-loading :loading="loading">
    <div class="note-library-container">
      <div class="note-library-header" v-if="bookmark.isPhone">
        <div class="header-content">
          <div class="back-icon" @click="back">
            <SvgIcon :src="icon.noteDetail.back" />
          </div>
          <div style="font-weight: 500; font-size: 20px" @click="init">笔记库</div>
        </div>
        <TagFilterSelector :allTags="allTags" v-model:noteType="noteType" />
      </div>
      <div v-else class="flex-align-center" style="justify-content: space-between; padding: 0 20px">
        <div style="font-weight: 500; font-size: 20px; cursor: pointer" @click="init">笔记库</div>
        <TagFilterSelector :allTags="allTags" v-model:noteType="noteType" />
      </div>
      <div class="note-library-body">
        <div
          v-for="note in viewNoteList"
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
          <div class="note-tags" v-if="getTags(note)">
            <div class="b-tag" v-for="tag in getTags(note)" @click.stop="noteType = tag">{{ tag }}</div>
          </div>
          <div class="note-tags" v-else style="font-size: 12px">_</div>
          <div> </div>
          <div
            :style="{ color: bookmark.theme === 'day' ? 'rgb(102, 102, 102)' : '#ccc' }"
            style="font-size: 12px; margin-top: 10px"
            >{{ note['updateTime'] ?? note['createTime'] }}</div
          >
        </div>
      </div>
    </div>
  </b-loading>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import router from '@/router';
  import { apiBasePost } from '@/http/request.ts';
  import { computed, ref } from 'vue';
  import { bookmarkStore } from '@/store';
  import TagFilterSelector from '@/view/noteLibrary/components/TagFilterSelector.vue';
  import BLoading from '@/components/BasicComponents/BLoading/BLoading.vue';
  const bookmark = bookmarkStore();
  const noteList = ref([]);
  const loading = ref(false);
  init();
  function init() {
    loading.value = true;
    apiBasePost('/api/note/queryNoteList')
      .then((res) => {
        if (res.status === 200) {
          noteList.value = res.data ?? [];
          noteList.value.forEach((data) => {
            const tags = data.tags ? JSON.parse(data.tags) : null;
            if (tags) {
              tags.forEach((tag) => {
                if (!allTags.value.includes(tag)) {
                  allTags.value.push(tag);
                }
              });
            }
          });
        }
      })
      .finally(() => {
        loading.value = false;
        noteType.value = 'all';
      });
  }

  const viewNoteList = computed(() => {
    if (noteType.value === 'all') {
      return noteList.value;
    }
    if (noteType.value === 'null') {
      return noteList.value.filter((item) => !item.tags);
    }
    return noteList.value.filter((item) => item.tags && JSON.parse(item.tags)?.includes(noteType.value));
  });

  const noteType = ref('all');
  const allTags = ref([]);

  const getTags = function (note) {
    if (note.tags) {
      return JSON.parse(note.tags);
    }
    return '';
  };

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
  function back() {
    if (bookmark.isPhone) {
      router.push('/personCenter');
    } else {
      router.back();
    }
  }
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
    height: calc(100% - 20px);
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 30px;
    overflow: auto;
    box-sizing: border-box;
    align-content: start;
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
    box-sizing: border-box;
    color: #666;
    font-size: 12px;
    line-height: 1rem;
    height: 180px;
    overflow: hidden;
    :deep(li) {
      margin-top: 5px;
    }
  }

  .note-tags {
    margin-top: 10px;
    display: flex;
    gap: 10px;

    .b-tag {
      background-color: #eeedff;
      padding: 2px 4px;
      min-width: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-size: 12px;
      color: #8b88f2;
      cursor: pointer;
    }
  }

  @media (max-width: 600px) {
    .note-library-body {
      padding: 5px;
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
