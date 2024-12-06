<template>
  <div>
    <BUpload @change="handleFileChange" accept="image/*"> 上传图片 </BUpload>
    <div v-show="originalFileSize">
      <img :src="imgSrc" style="max-height: 600px; width: 600px" />
      <p>原始图片大小：{{ originalFileSize.toFixed(1) }} KB</p>
      <p>转换后的 WebP 文件大小：{{ convertedFileSize.toFixed(1) }} KB</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const canvas = ref(null);
  const originalFileSize = ref(0);
  const convertedFileSize = ref(0);
  const imgSrc = ref('');
  const handleFileChange = async (event) => {
    const canvas = document.createElement('canvas');
    const file = event.target.files[0];
    if (!file) return;
    const fileName = file.name.split('.')[0];
    originalFileSize.value = file.size / 1024;
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      imgSrc.value = URL.createObjectURL(file);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      // 转换为 WebP 格式
      canvas.toBlob((blob) => {
        downloadBlob(blob, fileName);
      }, 'image/webp');
    };
  };
  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    convertedFileSize.value = blob.size / 1024;
    a.href = url;
    a.download = filename || 'download';
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    window.URL.revokeObjectURL(url);
  };
</script>
