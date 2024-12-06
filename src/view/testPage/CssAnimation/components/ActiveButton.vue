<template>
    <button class="body"> Active Button </button>
</template>
<style scoped>
  button {
    position: relative;
    cursor: pointer;
    border: 0;
  }

  button.body {
    position: absolute;
    width: 200px;
    height: 40px;
    background: #ccc;
    transform-style: preserve-3d;
    border-radius: 5px;
    transition: all 0.3s;
  }

  button.body::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #4e4b46;
    transform: translate3d(0, 0.75em, -1em);
    transition: all 0.3s;
    content: '';
    border-radius: 5px;
  }

  button.body:active {
    transform: translate(0em, 0.75em);
  }

  button.body:active::before {
    transform: translate3d(0, 0, -1em);
  }
</style>
<script setup lang="ts"></script>
