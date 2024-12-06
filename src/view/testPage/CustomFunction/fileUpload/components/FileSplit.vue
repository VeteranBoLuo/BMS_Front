<template>
  <div>
    <h1>文件上传后端</h1>
    <b-upload @change="handleUpload" accept="image/*" />
    <p>文件名称：{{ file.name }}</p>
    <p>文件类型：{{ file.type }}</p>
    <p>文件大小：{{ Number(file.size / 1024).toFixed(2) }}KB</p>
    <img v-if="preViewSrc" :src="preViewSrc" style="width: 200px; height: 200px" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import request from '@/http/request';
  import { message } from 'ant-design-vue';
  let file: any = reactive({});
  function handleUpload(e) {
    file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      return alert('上传文件的大小不能超过5M');
    }
    readFilePreview(file);
  }

  const preViewSrc = ref<string | ArrayBuffer>('');
  function readFilePreview(file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      preViewSrc.value = event.target.result;
      request.post('api/fileMg/upload', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        file: event.target.result,
      });
    };
    fileReader.readAsDataURL(file);
  }

  function handleFileDisplay(fileData) {
    // 将ArrayBuffer转换为Blob对象
    const blob = new Blob(fileData.data, { type: fileData.type });

    // 创建一个新的 FileReader 实例
    const fileReader = new FileReader();

    // 定义一个回调函数，用于处理读取操作完成后的操作
    fileReader.onload = function (e) {
      // 获取读取到的数据
      let src = String(e.target.result);
      preViewSrc.value = src;
      console.log(preViewSrc.value);

      // 将图像元素添加到页面上
    };

    // 使用 FileReader 的 readAsDataURL 方法来读取文件
    fileReader.readAsDataURL(blob);
  }

  onMounted(() => {
    request.get('/api/file/getImageList').then((res) => {
      handleFileDisplay({data:res.data[0].file.data,type:'image/webp'});
    });
  });
</script>

<style lang="less"></style>
