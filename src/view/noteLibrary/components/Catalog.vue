<template>
  <div class="toc-container">
    <div style="border-left: 1px solid #e8eaf2; margin: 10px; box-sizing: border-box">
      <div
        v-for="(heading, index) in note.headings"
        :key="index"
        @click="() => scrollToHeading(index)"
        :class="{ active: activeHeading === index }"
        class="toc-item"
        :style="{ paddingLeft: `${heading.level * 16}px` }"
      >
        <span class="toc-line" v-if="activeHeading === index"></span>
        <span class="text-hidden">{{ heading.text }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { noteStore } from '@/store';

  const props = defineProps<{
    content: string;
  }>();
  const note = noteStore();
  const activeHeading = ref<number | null>(null);

  const scrollToHeading = (index: number) => {
    const heading = note.headings[index];
    if (heading) {
      heading.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activeHeading.value = index;
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
    width: 260px;
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
  }

  .toc-line {
    position: absolute;
    left: -1px;
    width: 2px;
    height: 1.5rem;
    background-color: #615ced;
  }
</style>
