<template>
  <div class="toc-container">
    <div style="border-left: 1px solid #e8eaf2;margin: 10px;box-sizing: border-box">
      <div
        v-for="(heading, index) in headings"
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
  import { ref, onMounted, watch } from 'vue';

  const props = defineProps<{
    content: string;
  }>();

  const headings = ref<{ element: Element; text: string; level: number }[]>([]);
  const activeHeading = ref<number | null>(null);

  const getIframeDocument = () => {
    const iframe: any = document.getElementsByClassName('tox-edit-area__iframe')[0];
    return iframe?.contentDocument || iframe?.contentWindow?.document;
  };

  const generateTOC = () => {
    const iframeDoc = getIframeDocument();
    if (!iframeDoc) return;

    const hTags = iframeDoc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.value = Array.from(hTags)
        .filter((heading: any) => heading.innerText.trim() !== '' || heading.textContent.trim() !== '')
        .map((heading: any, index) => {
          const level = parseInt((heading.tagName as string).replace('H', ''), 10);
          return { element: heading, text: heading.innerText || heading.textContent || '', level };
        });
  };

  const scrollToHeading = (index: number) => {
    const heading = headings.value[index];
    if (heading) {
      heading.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activeHeading.value = index;
    }
  };

  onMounted(() => {});

  watch(
    () => props.content,
    () => {
      generateTOC();
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
