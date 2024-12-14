<template>
  <img id="viewImage" style="display: none" alt="Picture" :src="viewSrc" />
</template>

<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue';
  import { bookmarkStore } from '@/store';
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  const bookmark = bookmarkStore();
  const viewSrc = ref();

  watch(
    () => bookmark.viewerKey,
    () => {
      newView();
    },
  );

  function newView() {
    viewSrc.value = bookmark.viewer.src;
    nextTick(() => {
      const viewer = new Viewer(document.getElementById('viewImage'), {
        inline: false,
        ...bookmark.viewer.options,
        hidden() {
          viewer.destroy();
          viewSrc.value = '';
        },
      });
      viewer.show();
    });
  }
</script>

<style></style>
