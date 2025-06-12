<template>
  <a-tour
    v-if="tour.open"
    v-model:current="tour.current"
    :open="tour.open"
    :steps="tour.steps"
    @close="tour.close"
    @finish="tour.finish"
  />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue/dist/vue';
  import { useRouter } from 'vue-router';
  import { tourStore } from '@/store';
  const tour = tourStore();

  onMounted(() => {
    const router = useRouter();
    router.afterEach((to, from) => {
      if (tourStore().open) {
        tourStore().resetSteps();
      }
    });
  });
</script>
