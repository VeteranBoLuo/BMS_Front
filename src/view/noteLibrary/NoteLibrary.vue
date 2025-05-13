<template>
  <div class="note-library-container">
    <div class="note-library-header" v-if="bookmark.isPhone">
      <div class="header-content">
        <div class="back-icon" @click="back">
          <SvgIcon :src="icon.noteDetail.back" />
        </div>
        <div style="font-weight: 500; font-size: 20px">笔记库</div>
      </div>
      <div class="handle-btn-group">
        <b-button class="noteType-select" @click="filterVisible = !filterVisible">
          {{ viewNoteFilter
          }}<svg-icon :src="icon.arrow_left" :style="{ rotate: filterVisible ? '-90deg' : '90deg' }" />
          <div class="filter-container" :style="{ display: filterVisible ? '' : 'none' }">
            <div class="filter-item" @click="viewNote('all')" :isFocus="noteType === 'all' ? true : false"
              >全部笔记</div
            >
            <div class="filter-item" @click="viewNote('null')" :isFocus="noteType === 'null'">无标签笔记</div>
            <div style="width: 100%; height: 1px; background: #f0f0f0; flex-shrink: 0"></div>
            <div v-for="item in allTags" class="filter-item" @click="viewNote(item)" :isFocus="noteType === item"
              ># {{ item }}</div
            >
          </div>
        </b-button>
        <b-button
          type="primary"
          style="border-radius: 20px"
          @click="router.push('/noteLibrary/add')"
          v-click-log="{ module: '笔记', operation: '新建笔记' }"
        >
          + 新建笔记
        </b-button>
      </div>
    </div>
    <div v-else class="flex-align-center" style="justify-content: space-between; padding: 0 20px">
      <div style="font-weight: 500; font-size: 20px">笔记库</div>
      <div class="handle-btn-group">
        <b-button class="noteType-select" @click="filterVisible = !filterVisible">
          {{ viewNoteFilter
          }}<svg-icon :src="icon.arrow_left" :style="{ rotate: filterVisible ? '-90deg' : '90deg' }" />
          <div class="filter-container" :style="{ display: filterVisible ? '' : 'none' }">
            <div class="filter-item" @click="viewNote('all')" :isFocus="noteType === 'all' ? true : false"
              >全部笔记</div
            >
            <div class="filter-item" @click="viewNote('null')" :isFocus="noteType === 'null'">无标签笔记</div>
            <div style="width: 100%; height: 1px; background: #f0f0f0; flex-shrink: 0"></div>
            <div v-for="item in allTags" class="filter-item" @click="viewNote(item)" :isFocus="noteType === item"
              ># {{ item }}</div
            >
          </div>
        </b-button>
        <b-button
          type="primary"
          style="border-radius: 20px"
          @click="router.push('/noteLibrary/add')"
          v-click-log="{ module: '笔记', operation: '新建笔记' }"
        >
          + 新建笔记
        </b-button>
      </div>
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
          <div class="b-tag" v-for="tag in getTags(note)" @click.stop>{{ tag }}</div>
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
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import router from '@/router';
  import { apiBasePost } from '@/http/request.ts';
  import { computed, ref } from 'vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import { bookmarkStore } from '@/store';
  const bookmark = bookmarkStore();
  const noteList = ref([]);
  apiBasePost('/api/note/queryNoteList').then((res) => {
    if (res.status === 200) {
      noteList.value = res.data ?? [];
      noteList.value.forEach((data) => {
        const tags = JSON.parse(data.tags);
        if (tags) {
          tags.forEach((tag) => {
            if (!allTags.value.includes(tag)) {
              allTags.value.push(tag);
            }
          });
        }
      });
    }
  });

  const viewNoteList = computed(() => {
    if (noteType.value === 'all') {
      return noteList.value;
    }
    if (noteType.value === 'null') {
      return noteList.value.filter((item) => !item.tags);
    }
    return noteList.value.filter((item) => JSON.parse(item.tags)?.includes(noteType.value));
  });

  const viewNoteFilter = computed(() => {
    if (noteType.value === 'all') {
      return '全部笔记';
    }
    if (noteType.value === 'null') {
      return '无标签笔记';
    }
    return noteType.value;
  });
  function viewNote(type?: 'all' | 'null' | string) {
    noteType.value = type;
  }

  const noteType = ref('all');
  const allTags = ref([]);

  const getTags = function (note) {
    if (note.tags) {
      return JSON.parse(note.tags);
    }
    return '';
  };

  const filterVisible = ref(false);

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
    width: 100%;
    height: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 30px;
    overflow: auto;
    box-sizing: border-box;
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
      min-width: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-size: 12px;
      color: #8b88f2;
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
  .handle-btn-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .noteType-select {
    position: relative;
    border-radius: 36px !important;
    border: 1px solid #e8eaf2 !important;
    display: flex;
    gap: 5px;
  }
  .filter-container {
    width: 200px;
    height: 200px;
    padding: 5px;
    background: var(--menu-cintainer-bg-color);
    box-shadow: 1px 1px 5px #4d5264;
    position: absolute;
    top: 32px;
    right: 0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: auto;
  }
  .filter-item {
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    height: 36px;
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
