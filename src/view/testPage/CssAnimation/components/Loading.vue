<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<style scoped>
  .loader {
    display: flex;
    gap: 5px;
  }
  .loader > div {
    height: 20px;
    width: 20px;
    border-radius: 4px;
    &:nth-child(1) {
      background-color: #ccc;
      animation: loading 0.8s linear infinite;
    }
    &:nth-child(2) {
      background-color: #ccc;
      animation: loading 0.8s linear infinite;
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      background-color: #ccc;
      animation: loading 0.8s linear infinite;
      animation-delay: 0.4s;
    }
  }

  @keyframes loading {
    25% {
      transform: translateY(-30%);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(30%);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
