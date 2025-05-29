<template>
  <div class="loader-container" :style="{ opacity: loading ? '0.6' : '1' }">
    <slot> </slot>
    <div  v-if="loading">
      <note-loading/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import NoteLoading from "@/view/noteLibrary/components/NoteLoading.vue";

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="less">
  .loader-container {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  /* HTML: <div class="loader"></div> */
  .loader {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    width: 40px;
    --b: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    padding: 1px;
    background: conic-gradient(#0000 10%, var(--text-color)) content-box;
    -webkit-mask: repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
      radial-gradient(farthest-side, #0000 calc(100% - var(--b) - 1px), #000 calc(100% - var(--b)));
    -webkit-mask-composite: destination-in;
    mask-composite: intersect;
    animation: l4 1s infinite steps(10);
  }
  @keyframes l4 {
    to {
      transform: rotate(1turn);
    }
  }
</style>
