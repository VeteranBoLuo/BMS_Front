<template>
  <div class="edit-container">
    <div class="leftBox">
      <textarea
        wrap="off"
        cols="2"
        id="leftNum"
        disabled
        onscroll="document.getElementById('rightNum').scrollTop = this.scrollTop;"
      ></textarea>
    </div>
    <textarea
      id="rightNum"
      @input="handleTextareaInput"
      v-model="areaText"
      onscroll="document.getElementById('leftNum').scrollTop = this.scrollTop;"
      spellcheck="false"
      class="area-content"
      readonly
    ></textarea>
    <div class="copyBtn">复制</div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  const props = defineProps({
    value: {
      default: '',
    },
  });
  const areaText = ref(props.value);
  const num = ref('');
  function handleTextareaInput(e) {
    let str = e.target.value;
    str = str.replace(/\r/gi, '');
    str = str.split('\n');
    let n = str.length;
    let lineBbj: any = document.getElementById('leftNum');
    for (let i = 1; i <= n; i++) {
      if (document.all) {
        num.value += i + '\r\n'; //判断浏览器是否是IE
      } else {
        num.value += i + '\n';
      }
    }
    lineBbj.value = num.value;
    num.value = '';
  }

  onMounted(() => {
    let str: any = areaText.value;
    str = str.replace(/\r/gi, '');
    str = str.split('\n');
    let n = str.length;
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
  .edit-container {
    border: 1px solid #f5f7fa;
    height: 505px;
    display: flex;
    padding: 10px 10px 10px 0;
    background-color: #f5f7fa;
    border-radius: 5px  ;
    position: relative;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    &:hover {
      .copyBtn {
        opacity: 0.8;
      }
    }
  }
  .leftBox {
    height: 100%;
    text-align: left;
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
    overflow: hidden;
    padding: 10px 4px;
    height: 100%;
    width: 100%;
    line-height: 24px;
    font-size: 13px;
    text-align: right;
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
