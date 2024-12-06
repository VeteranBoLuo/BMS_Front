<template>
  <div
    style="
      box-shadow: 0 0 6px 2px #ccc;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 30px;
      height: 400px;
      width: 550px;
    "
  >
    <b-space wrap>
      <b-input v-model:value="inputValue" style="width: 300px" />
      <b-button type="primary" @click="createQrCode" style="margin-bottom: 10px"
        >生成二维码</b-button
      >
      <b-button @click="download">下载</b-button></b-space
    >
    <QrCode id="qrcode" :value="qrcodeData" style="margin-top: 20px" />
  </div>
</template>

<script lang="ts" setup>
  import QrCode from '@/components/QrCode/QrCode.vue';
  import { ref } from 'vue';
  import html2canvas from 'html2canvas';
  import BSpace from '@/components/BasicComponents/BSpace/BSpace.vue';

  const qrcodeData = ref('null');
  const inputValue = ref('');

  function createQrCode() {
    if (!inputValue.value) {
      qrcodeData.value = 'null';
      return;
    }
    qrcodeData.value = inputValue.value;
  }

  function download() {
    html2canvas(document.getElementById('qrcode')).then((canvas) => {
      //转成图片并下载
      const domA = document.createElement('a');
      //设置下载下来的文件名字，默认的是“下载”
      domA.download = '二维码';
      //图片连接，canvas转成的图片连接（image/png指的是图片文件格式，png可以改成jpg、jpeg）
      domA.href = canvas.toDataURL('image/png');
      //触发点击事件，这是真正开始下载的一步
      domA.click();
    });
  }
</script>

<style lang="less"></style>
