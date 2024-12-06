<template>
  <div class="card-panel">
    <div v-for="item in getBookList">
      <TagCard :cardInfo="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import TagCard from '@/view/tag/components/TagCard.vue';
  import { bookmarkStore } from '@/store';
  import { computed } from 'vue';
  const bookmark = bookmarkStore();

  const getBookList = computed(() => {
    return bookmark.bookmarkList;
  });


</script>

<style lang="less">
  .card-panel {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    padding: 0 20px;
    gap: 30px;
  }
  @media (max-width: 600px) {
    .card-panel {
      justify-content: center;
    }
  }
</style>
