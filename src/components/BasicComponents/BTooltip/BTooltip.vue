<template>
  <div style="position: relative; padding: 5px 0">
    <div
      :id="id"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
      class="title"
      @click="handleClick"
    >
      <slot></slot>
    </div>
    <div
      @mouseenter="inToolTipBody = true"
      @mouseleave="inToolTipBody = false"
      class="content"
      :style="contentStyle"
      v-if="isShowBody"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onUnmounted, PropType, ref, watch } from 'vue';

  const props = defineProps({
    direction: {
      type: String as PropType<
        'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
      >,
      default: 'bottom',
    },
    trigger: {
      type: String as PropType<'hover' | 'click' | 'contextmenu'>,
      default: 'hover',
    },
  });
  const isShowBody = ref(false);
  const contentStyle: any = ref('');
  const id: string = generateRandom7DigitNumber();

  function generateRandom7DigitNumber(): string {
    // 生成一个1000000到9999999之间的随机数
    const number = Math.floor(Math.random() * 9000000) + 1000000;
    // 将数字转换为字符串
    return number.toString();
  }

  const inToolTipBody = ref(false);
  function handleEnter() {
    if (props.trigger === 'hover') {
      calculateStyle();
      isShowBody.value = true;
    }
  }
  function handleLeave() {
    if (props.trigger === 'hover') {
      isShowBody.value = false;
    }
  }

  function calculateStyle() {
    const div = document.getElementsByClassName('title');
    if (props.direction === 'top') {
      contentStyle.value = {
        bottom: div[0].clientHeight + 'px',
        left: div[0].clientWidth / 2 + 'px',
        transform: 'translate(-50%, -5px)',
      };
    } else if (props.direction === 'bottom') {
      contentStyle.value = {
        left: div[0].clientWidth / 2 + 'px',
        transform: 'translate(-50%, 5px)',
      };
    } else if (props.direction === 'topLeft') {
      contentStyle.value = {
        right: div[0].clientWidth + 'px',
        bottom: div[0].clientHeight + 'px',
      };
    } else if (props.direction === 'topRight') {
      contentStyle.value = {
        left: div[0].clientWidth + 'px',
        bottom: div[0].clientHeight + 'px',
      };
    } else if (props.direction === 'bottomLeft') {
      contentStyle.value = {
        right: div[0].clientWidth + 'px',
      };
    } else {
      contentStyle.value = {
        left: div[0]?.clientWidth + 'px',
      };
    }
  }

  function handleClick() {
    if (props.trigger === 'click') {
      calculateStyle();
      isShowBody.value = !isShowBody.value;
    }
  }

  function hasAncestorWithId(element, id) {
    // 如果元素本身有指定的ID，返回true
    if (element.id === id) {
      return true;
    }
    // 如果元素是document的根元素，返回false
    if (element === document.documentElement) {
      return false;
    }
    // 检查父元素
    return hasAncestorWithId(element.parentNode, id);
  }
  function outCloseToolTip(e) {
    const titleElement = document.getElementById(id);
    // 如果点击的不是title元素，同时也不是提示框本身，则关闭
    if (!inToolTipBody.value && !hasAncestorWithId(e.target, titleElement.id)) {
      isShowBody.value = false;
    }
  }

  function close() {
    isShowBody.value = false;
    inToolTipBody.value = false;
  }

  watch(
    () => isShowBody.value,
    (val) => {
      if (val) {
        document.addEventListener('click', outCloseToolTip);
      } else {
        document.removeEventListener('click', outCloseToolTip);
      }
    },
  );

  defineExpose({
    close,
  });
</script>

<style scoped lang="less">
  .title {
    width: max-content;
  }
  .content {
    position: absolute;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 5px;
    box-sizing: border-box;
    background-color: white;
    z-index: 999;
    border-radius: 8px;
    overflow: hidden;
  }
</style>
