<template>
  <div style="display: flex; height: 100%; text-align: center">
    <div style="height: 100%">
      <span>拖拽到目标元素之前或者之后</span>
      <div
        v-for="(item, index) in Array"
        :key="index"
        class="drag_div"
        draggable="true"
        @dragover.prevent
        @dragover="handleOver(index)"
        @dragstart="handleDragStart(index)"
        @drop="handleDrop(index)"
        @dragend="clearLine"
      >
        <span>{{ item }}</span>
      </div>
    </div>
    <div style="margin-left: 20px">
      <span>拖拽后直接与目标元素交换位置</span>
      <div
        v-for="(item, index) in Array2"
        :key="index"
        class="drag_div"
        draggable="true"
        @dragover.prevent
        @dragstart="handleDragStart(index)"
        @drop="handleDropChange(index)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="edit-container">
      <textarea
        wrap="off"
        cols="2"
        id="leftNum"
        disabled
        onscroll="document.getElementById('rightNum').scrollTop = this.scrollTop;"
      ></textarea>
      <textarea
        id="rightNum"
        v-model="code"
        onscroll="document.getElementById('leftNum').scrollTop = this.scrollTop;"
        spellcheck="false"
        class="area-content"
        readonly
        style="width: 650px"
      ></textarea>
      <div class="copyBtn" @click="copyText">{{ isCopy ? '已复制' : '复制' }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { tem } from '@/view/config.ts';
  import { copyTextToClipboard } from '@/utils/common.ts';

  const Array = ref(['张三', '李四', '王五', '赵六']);
  const Array2 = ref(['张三', '李四', '王五', '赵六']);

  const code = ref(tem);

  // 拖拽开始时触发，获取拖拽元素的索引
  const startIndex: any = ref(0);
  function handleDragStart(index) {
    if (index !== startIndex.value) {
      startIndex.value = index;
    }
  }

  // 拖拽到目标元素上松开鼠标时，插入到目标元素之前或之后
  function handleDrop(index) {
    if (startIndex.value !== null) {
      Array.value.splice(index, 0, Array.value.splice(startIndex.value, 1)[0]);
      startIndex.value = null;
    }
  }

  // 拖拽到目标元素上松开鼠标时，交换顺序
  function handleDropChange(index) {
    if (startIndex.value !== null) {
      const temp = Array2.value[index];
      Array2.value[index] = Array2.value[startIndex.value];
      Array2.value[startIndex.value] = temp;
      startIndex.value = null;
    }
  }

  // 经过目标元素时生成拖拽标识线
  function handleOver(index) {
    const body: any = document.getElementsByClassName('drag_div')[index];
    body.style.position = 'relative';
    clearLine();
    const line = document.createElement('div');
    line.style.height = '2px';
    line.className = 'line-border';
    line.style.background = '#1677ff';
    line.style.width = body.offsetWidth + 'px';
    line.style.position = 'absolute';
    if (startIndex.value < index) {
      body.appendChild(line);
      line.style.bottom = '-2px';
    } else if (startIndex.value > index) {
      body.appendChild(line);
      line.style.top = '-2px ';
    }
  }

  function clearLine() {
    const elements = document.getElementsByClassName('line-border');
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i].parentNode.removeChild(elements[i]);
    }
  }

  const isCopy = ref(false);
  function copyText() {
    // 调用函数，将需要复制的文本传递给它，并处理返回的Promise
    const tip = copyTextToClipboard(code.value);
    if (tip) {
      isCopy.value = true;
      setTimeout(() => {
        isCopy.value = false;
      }, 2000);
    }
  }

  const num = ref('');
  const line = ref('');
  onMounted(() => {
    let str: any = code.value;
    str = str.replace(/\r/gi, '');
    str = str.split('\n');
    let n = str.length;
    line.value = String(n).length * 13 + 8 + 'px';
    let lineBbj: any = document.getElementById('leftNum');
    for (let i = 1; i <= n; i++) {
      if (document.all) {
        num.value += i + '\r\n'; //判断浏览器是否是IE
      } else {
        num.value += i + '\n';
      }
    }
    lineBbj.value = num.value;
  });
</script>

<style scoped lang="less">
  .drag_div[data-draggable='true'] {
    -webkit-user-drag: element;
  }

  .drag_div[data-draggable='true']::webkit-drag {
    color: red !important; /* 改变文字颜色 */
    background-color: red !important; /* 改变背景颜色 */
    opacity: 1; /* 调整透明度 */
    transform: scale(1); /* 调整大小 */
    /* 其他你希望应用的样式 */
  }

  .drag_div {
    height: 180px;
    width: 400px;
    margin-top: 10px;
    border-radius: 10px;
    cursor: move;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  }
  .edit-container {
    border: 1px solid #f5f7fa;
    height: 725px;
    display: flex;
    padding: 10px 10px 10px 0;
    background-color: #f5f7fa;
    border-radius: 5px;
    margin-left: 50px;
    margin-top: 35px;
    position: relative;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    &:hover {
      .copyBtn {
        opacity: 0.8;
      }
    }
  }
  .area-content {
    padding: 10px 8px;
    width: 100%;
    height: 100%;
    font-size: 13px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);
    font-family: Consolas;
    border: none;
    background: #ffffff;
    box-sizing: border-box;
    outline: none;
    resize: none;
  }
  #leftNum {
    padding: 10px 0;
    height: 100%;
    width: v-bind(line);
    overflow: hidden;
    line-height: 24px;
    font-size: 13px;
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
    font-weight: bold;
    resize: none;
    outline: none;
    // overflow-y: hidden;
    // overflow-x: hidden;
    border: 0;
    background: #f5f7fa;
    box-sizing: border-box;
  }
  .copyBtn {
    border: 1px solid #d9d9d9;
    white-space: nowrap;
    text-align: center;
    box-sizing: border-box;
    width: 60px;
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #9999aa;
    height: 32px;
    lineheight: 32px;
    padding: 0 15px;
    fontsize: 14px;
    color: white;
    border-radius: 4px;
    position: absolute;
    right: 30px;
    top: 15px;
    opacity: 0;
  }
</style>
