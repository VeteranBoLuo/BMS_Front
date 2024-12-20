<template>
  <div class="phone-container no-scrollbar">
    <div class="phone-navigation">
      <slot name="navigation">
        <span
          style="position: absolute; left: 0; top: 30px; transform: translateY(-50%)"
          class="flex-align-center"
          @click="router.back()"
        >
          <svg-icon :src="icon.arrow_left" size="25" />
        </span>
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="phone-body">
      <slot name="default" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import router from '@/router';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { bookmarkStore } from '@/store';
  const bookmark = bookmarkStore();
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="less" scoped>
  .phone-container {
    position: fixed !important;
    top: 0 !important;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100% !important;
    display: flex;
    flex-direction: column;
  }

  .phone-navigation {
    margin: 0 auto;
    font-size: 20px;
    font-weight: 550;
    width: calc(100% - 40px);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
  }
  .phone-body {
    height: calc(100% - 80px);
    width: calc(100% - 40px);
    position: fixed;
    top: 60px;
    padding-top: 20px;
    box-sizing: border-box;
    overflow: auto;
  }
</style>
