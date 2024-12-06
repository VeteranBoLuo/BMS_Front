<template>
  <div>
    <button id="start-screenshot" @click="startScreenshot">开始截图</button>
    <div
      v-if="showOverlay"
      id="overlay"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
    >
      <!--   全屏黑色蒙版，框选之后消失    -->
      <div v-if="maskJud" :style="maskStyle"></div>
      <!--  框选的高亮区      -->
      <div v-if="selecting" id="selection" :style="selectionStyle"> </div>
      <!--   高亮区外的蒙版  -->
      <div v-if="selecting" :style="maskTopStyle"></div>
      <div v-if="selecting" :style="maskBottomStyle"></div>
      <div v-if="selecting" :style="maskLeftStyle"></div>
      <div v-if="selecting" :style="maskRightStyle"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import html2canvas from 'html2canvas';

  // 截图开启标识
  const showOverlay = ref(false);
  // 已开始框选标识,用于显示高亮和灰色块
  const selecting = ref(false);
  const startX = ref(0);
  const startY = ref(0);
  const currentX = ref(0);
  const currentY = ref(0);

  const selectionStyle = ref({});
  const maskTopStyle = ref({});
  const maskBottomStyle = ref({});
  const maskLeftStyle = ref({});
  const maskRightStyle = ref({});

  // 用于显示点击开始截图后的蒙版
  const maskJud = ref(false);
  const maskStyle = ref({
    top: '0',
    left: '0',
    width: '100%',
    height: `100%`,
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  });
  function startScreenshot() {
    showOverlay.value = true;
    maskJud.value = true;
  }

  function onMouseDown(e: MouseEvent) {
    maskJud.value = false;
    selecting.value = true;
    startX.value = e.clientX;
    startY.value = e.clientY;
    currentX.value = e.clientX;
    currentY.value = e.clientY;
    updateSelectionAndMasks();
  }
  function onMouseMove(e: MouseEvent) {
    if (selecting.value) {
      currentX.value = e.clientX;
      currentY.value = e.clientY;
      updateSelectionAndMasks();
    }
  }

  function onMouseUp() {
    selecting.value = false;
    showOverlay.value = false;
    createScreenshot(startX.value, startY.value, currentX.value, currentY.value);
  }

  function updateSelectionAndMasks() {
    const top = Math.min(startY.value, currentY.value);
    const left = Math.min(startX.value, currentX.value);
    const width = Math.abs(startX.value - currentX.value);
    const height = Math.abs(startY.value - currentY.value);

    selectionStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      position: 'fixed',
      border: '2px solid #fff',
      zIndex: 1001,
    };

    maskTopStyle.value = {
      top: '0',
      left: '0',
      width: '100%',
      height: `${top}px`,
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    };

    maskBottomStyle.value = {
      top: `${top + height}px`,
      left: '0',
      width: '100%',
      height: `calc(100% - ${top + height}px)`,
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    };

    maskLeftStyle.value = {
      top: `${top}px`,
      left: '0',
      width: `${left}px`,
      height: `${height}px`,
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    };

    maskRightStyle.value = {
      top: `${top}px`,
      left: `${left + width}px`,
      width: `calc(100% - ${left + width}px)`,
      height: `${height}px`,
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    };
  }

  async function createScreenshot(startX: number, startY: number, endX: number, endY: number) {
    const screenshot = document.createElement('canvas');
    screenshot.width = Math.abs(endX - startX);
    screenshot.height = Math.abs(endY - startY);
    const ctx = screenshot.getContext('2d');

    // 使用html2canvas来绘制截图
    const canvas = await html2canvas(document.body, {
      x: startX,
      y: startY,
      width: screenshot.width,
      height: screenshot.height,
    });

    ctx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.href = screenshot.toDataURL('image/png');
    link.download = 'screenshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    reset();
  }

  function reset() {
    startX.value = 0;
    startY.value = 0;
    currentX.value = 0;
    currentY.value = 0;
  }
</script>

<style scoped>
  #start-screenshot {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: crosshair;
    z-index: 999999;
  }

  #selection {
    position: fixed;
    border: 2px solid #fff;
  }
</style>
