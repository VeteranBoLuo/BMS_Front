<template>
  <div
    style="
      color: black;
      width: 800px;
      height: max-content;
      text-align: left;
      float: right;
      border-radius: 5px;
      overflow: hidden;
    "
  >
    <div style="padding: 10px; background-color: #eef0f4">
      <slot name="description"></slot>
    </div>
    <div class="centerDes">
      示例
      <a-space>
        <a-tooltip>
          <template #title> {{ noCopy ? '复制代码' : '复制成功' }}</template>
          <img
            src="@/assets/icons/copy.svg"
            style="height: 20px; width: 20px; cursor: pointer"
            @click="handleCopy"
            v-if="noCopy"
          />
          <img
            src="@/assets/icons/correct.svg"
            style="height: 20px; width: 20px; cursor: pointer"
            @mouseleave="noCopy = true"
            v-else
          />
        </a-tooltip>
        <a-tooltip v-if="isSHow">
          <template #title> 收起代码</template>
          <img
            src="@/assets/icons/codeView.svg"
            style="height: 20px; width: 20px; cursor: pointer"
            @click="isSHow = !isSHow"
          />
        </a-tooltip>
        <a-tooltip v-else>
          <template #title> 显示代码</template>
          <img
            src="@/assets/icons/codeHide.svg"
            style="height: 20px; width: 20px; cursor: pointer"
            @click="isSHow = !isSHow"
          />
        </a-tooltip>
      </a-space>
    </div>
    <div class="edit-container" v-show="isSHow" style="width: 800px" :style="{ height: height }">
      <textarea
        wrap="off"
        cols="2"
        id="leftNum"
        disabled
        onscroll="document.getElementById('rightNum').scrollTop = this.scrollTop;"
      ></textarea>
      <textarea
        id="rightNum"
        v-model="areaText"
        onscroll="document.getElementById('leftNum').scrollTop = this.scrollTop;"
        spellcheck="false"
        class="area-content"
        readonly
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { onMounted } from 'vue';
  import { copyTextToClipboard } from '@/utils/common.ts';
  import message from '@/components/BasicComponents/Message/message.ts';
  const props = defineProps({
    value: {
      default: '',
    },
    height: {
      type: String,
      default: '100%',
    },
  });
  const isSHow = ref(true);
  const areaText = ref(props.value);
  const num = ref('');
  const line = ref('');
  onMounted(() => {
    let str: any = areaText.value;
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
  const noCopy = ref(true);
  function handleCopy() {
    copyTextToClipboard(props.value);
    noCopy.value = false;
  }
</script>

<style scoped lang="less">
  .centerDes {
    font-size: 14px;
    border: 1px solid #eef0f4;
    justify-content: space-between;
    display: inline-flex;
    align-items: center;
    border-width: 0 2px 2px 2px;
    width: 800px;
    height: 34px;
    padding: 10px;
    box-sizing: border-box;
  }
  .edit-container {
    display: flex;
    padding: 10px 10px 10px 0;
    background-color: #f5f7fa;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0 5px 5px;
    &:hover {
      .copyBtn {
        opacity: 0.8;
      }
    }
  }
  .area-content {
    padding: 10px 0s;
    width: 100%;
    height: 100%;
    font-size: 13px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);
    border: none;
    background: #ffffff;
    box-sizing: border-box;
    outline: none;
    resize: none;
  }
  #leftNum {
    padding: 10px 4px;
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
    border: 0;
    background: #f5f7fa;
    box-sizing: border-box;
  }
  .copyBtn {
    border: 1px solid #d9d9d9;
    white-space: nowrap;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
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
