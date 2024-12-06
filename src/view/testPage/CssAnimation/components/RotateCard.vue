<template>
  <div class="rotate-container">
    <div class="shell">
      <!-- 外层容器 -->
      <div class="box" v-for="item in cardList">
        <!-- 盒子容器 -->
        <div class="images">
          <!-- 图片容器 -->
          <img src="@/assets/img/head.png" style="height: 240px; width: 100%" />
        </div>
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const cardList = [
    {
      title: '个人介绍',
      content: 'The style in the painting integrates temptation',
    },
    {
      title: '个人介绍',
      content: 'The style in the painting integrates temptation',
    },
    {
      title: '个人介绍',
      content: 'The style in the painting integrates temptation',
    },
    {
      title: '个人介绍',
      content: 'The style in the painting integrates temptation',
    },
    {
      title: '个人介绍',
      content: 'The style in the painting integrates temptation',
    },
  ];
</script>

<style lang="less">
  .rotate-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    box-sizing: border-box;
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  }

  .shell {
    height: max-content;
    position: relative;
    display: flex;
    gap: 60px;
    justify-content: center;
    /* 换行排列子元素 */
    flex-wrap: wrap;
    /* 保持3D变换 */
    /* 设置透视效果 */
    perspective: 900px;
    &:has(.box:hover) {
      .box {
        transform: rotateY(20deg);
      }
    }
  }
  .box {
    position: relative;
    width: 200px;
    height: 300px;
    transition: 0.6s;
    /* 隐藏溢出部分 */
    overflow: hidden;
    border-radius: 5px;
    border: #fff 5px solid;
    box-sizing: border-box;
    &:hover {
      transform: rotateY(0deg) scale(1.25) !important;
      /* 当前 .box 元素恢复到0度旋转并放大到1.25倍 */
      box-shadow: 0 25px 40px rgba(0, 0, 0, 0.7);
      /* 添加阴影效果 */
      z-index: 1;
    }
  }
  /* 鼠标悬停在 .box 上时，它后面的 .box 元素的效果 */
  .box:hover {
    ~ .box {
      transform: rotateY(-20deg) !important;
    }
  }

  .images {
    background-color: white;
    display: flex;
    padding-top: 20px;
    height: 100%;
  }

  .shell .box .content {
    position: absolute;
    top: 0;
    width: 90%;
    height: 100%;
    z-index: 999;
    margin-left: 10px;
  }

  .shell .box .content h3 {
    color: rgb(210, 140, 140);
    /* 设置标题颜色 */
    transition: 0.6s;
    /* 过渡效果时长 */
    font-size: 20px;
    /* 字体大小20像素 */
    transform: translateY(-100px);
    margin-left: 20px;
    /* 初始位置向上偏移100像素 */
  }

  /* 鼠标悬停在 .box 上时的标题效果 */
  .shell .box:hover .content h3 {
    transform: translateY(-25px);
    /* 标题向上偏移15像素 */
  }

  .shell .box .content p {
    color: rgb(0, 0, 0);
    /* 设置段落文本颜色 */
    transition: 0.6s;
    /* 过渡效果时长 */
    font-size: 10px;
    /* 字体大小14像素 */
    transform: translateY(600px);
    /* 初始位置向下偏移600像素 */
    background-color: rgba(255, 255, 255, 0.7);
    /* 设置背景颜色及透明度 */
  }

  /* 鼠标悬停在 .box 上时的段落效果 */
  .shell .box:hover .content p {
    transform: translateY(195px);
    /* 段落向下偏移220像素 */
  }
</style>
