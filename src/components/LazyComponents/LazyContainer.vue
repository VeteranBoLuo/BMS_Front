<template>
  <div ref="container">
    <slot v-if="isInit"></slot>
    <!--组件初始化之前显示加载态loading-->
    <div key="skeleton" v-else style="height: 100%; width: 100%">
      <!-- 如果提供了骨架屏插槽，则显示它 -->
      <slot name="skeleton" v-if="$slots.skeleton"></slot>
      <!-- 否则显示默认的加载态 -->
      <div v-else class="skeleton-item">
        <loading  />
      </div>
    </div>
  </div>
</template>
<script setup defer>
  import { onMounted, onUnmounted, ref } from 'vue';
  import Loading from '@/view/testPage/CssAnimation/components/Loading.vue';

  const container = ref(null);
  const isInit = ref(false);
  const timer = ref();
  onMounted(() => {
    // 创建一个Intersection Observer对象来观察元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
      // 如果元素进入视口，设置定时器，800毫秒后设置isInit为true
      if (entries[0].isIntersecting) {
        timer.value = setTimeout(() => {
          isInit.value = true;
          // 在组件卸载时取消观察
          observer.unobserve(container.value);
        }, 800);
      }
    });
    // 开始观察container元素
    observer.observe(container.value);
  });
  onUnmounted(() => {
    clearTimeout(timer.value);
  });
</script>
<style scoped>
  .skeleton-item {
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skeleton-item:empty {
    border: 1px solid #ccc;
  }
</style>
