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
        <div class="handle-btn-group">
          <TagFilterSelector :allTags="allTags" v-model:noteType="noteType" @nodeTypeChange="noteType = $el" />
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
        <div style="font-weight: 500; font-size: 20px; cursor: pointer" @click="init">笔记库</div>
        <div class="handle-btn-group">
          <template v-if="hasCheck">
            <span class="deleteText" @click="batchDeleteNote"><svg-icon :src="icon.noteDetail.delete" />删除所选</span>
            <b-button
              type="primary"
              style="border-radius: 20px"
              @click="exitBatch"
              v-click-log="{ module: '笔记', operation: '新建笔记' }"
            >
              退出批量操作
            </b-button>
          </template>
          <template v-else>
            <TagFilterSelector :allTags="allTags" v-model:noteType="noteType" />
            <b-button
              type="primary"
              style="border-radius: 20px"
              @click="router.push('/noteLibrary/add')"
              v-click-log="{ module: '笔记', operation: '新建笔记' }"
            >
              + 新建笔记
            </b-button>
          </template>
        </div>
      </div>
      <div class="note-library-body">
        <note-card v-for="note in viewNoteList" :note="note" />
      </div>
    </div>
  </b-loading>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/base/SvgIcon/src/SvgIcon.vue';
  import router from '@/router';
  import { apiBasePost } from '@/http/request.ts';
  import { computed, ref } from 'vue';
  import { bookmarkStore } from '@/store';
  import TagFilterSelector from '@/components/noteLibrary/library/TagFilterSelector.vue';
  import BLoading from '@/components/base/BasicComponents/BLoading.vue';
  import NoteCard from '@/components/noteLibrary/library/NoteCard.vue';
  import BButton from '@/components/base/BasicComponents/BButton.vue';
  import Alert from '@/components/base/BasicComponents/BModal/Alert.ts';
  import { message } from 'ant-design-vue';
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

  function back() {
    if (bookmark.isPhone) {
      router.push('/personCenter');
    } else {
      router.back();
    }
  }

  const hasCheck = computed(() => {
    return viewNoteList.value.some((data) => data.isCheck === true);
  });

  function exitBatch() {
    viewNoteList.value.forEach((data) => {
      data.isCheck = false;
    });
  }

  function batchDeleteNote() {
    const delIds = viewNoteList.value.filter((data) => data.isCheck).map((item) => item.id) || [];
    Alert.alert({
      title: '提示',
      content: `请确认是否要删除所选笔记？`,
      onOk() {
        apiBasePost('/api/note/delNote', {
          ids: delIds,
        }).then(() => {
          message.success('删除成功');
          init();
        });
      },
    });
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
    height: 32px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .deleteText {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #f54e4e;
  }
</style>
