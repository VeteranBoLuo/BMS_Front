<template>
  <div class="toc-container">
    <div style="border-left: 1px solid #e8eaf2; margin: 10px; box-sizing: border-box">
      <div
        v-for="(heading, index) in note.headings"
        :key="index"
        @click="() => scrollToHeading(index)"
        :class="{ active: activeHeading === index }"
        class="toc-item"
        :style="{ paddingLeft: `${heading.level * 16}px`, color: bookmark.theme === 'day' ? '#585a73' : '#ccc' }"
      >
        <span class="toc-line" v-if="activeHeading === index"></span>
        <span class="text-hidden" style="font-size: 14px">{{ heading.text }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref, watch } from 'vue';
  import { bookmarkStore, noteStore } from '@/store';
  import { customTimer } from '@/utils/common.ts';
  const bookmark = bookmarkStore();
  const props = defineProps<{
    content: string;
  }>();
  const note = noteStore();
  const activeHeading = ref<number | null>(null);

  const scrollToHeading = async (index: number) => {
    activeHeading.value = index;
    // 平板和手机
    if (bookmark.screenWidth < 1500) {
      await customTimer(100);
    }
    const heading = note.headings[index];
    if (heading) {
      heading.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  watch(
    () => props.content,
    () => {
      note.generateTOC();
    },
  );
</script>

<style scoped>
  .toc-container {
    width: 300px;
    height: calc(100% - 60px);
    overflow: auto;
    box-sizing: border-box;
  }

  .toc-item {
    cursor: pointer;
    padding: 5px 0;
    position: relative;
    display: flex;
    align-items: center;
  }

  .toc-item.active {
    font-weight: bold;
    color: #615ced !important;
  }

  .toc-line {
    position: absolute;
    left: -1px;
    width: 2px;
    height: 1.5rem;
    background-color: #615ced;
  }
  @media (max-width: 1919px) {
    .toc-container {
      width: 280px;
    }
  }
  @media (max-width: 1500px) {
    .toc-container {
      width: 250px;
    }
  }
  @media (max-width: 1200px) {
    .toc-container {
      width: 200px;
    }
  }
  @media (max-width: 1000px) {
    .toc-container {
      width: 170px;
    }
  }
  @media (max-width: 800px) {
    .toc-container {
      width: 150px;
    }
  }
</style>
