<template>
  <div style="width: 600px">
    <div
      v-for="(item, index) in labelOptions"
      class="scroll"
      :key="'main' + index"
      :style="{ '--t': (item.lazy ? item.lazy : lazy) + 's' }"
      v-show="item.show !== false"
    >
      <div>
        <span v-for="(cItem, cIndex) in item.labels" :key="cIndex + '1'">{{ cItem }}</span>
      </div>
      <div>
        <span v-for="(cItem, cIndex) in item.labels" :key="cIndex + '2'">{{ cItem }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    lazy: {
      type: Number,
      default: 30,
    },
    labelOptions: {
      type: Array,
      default: [
        {
          lazy: 30,
          labels: ['HTML********', 'CSS', 'JavaScript', 'Vue', 'React', 'Figma', 'Photoshop'],
        },
      ],
    },
  });
</script>

<style lang="less" scoped>
  .scroll {
    display: flex;
    width: 100%;
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
  }

  .scroll > div span {
    display: inline-block;
    margin: 10px;
    padding: 5px 10px;
    background-color: #90b95b;
    border-radius: 5px;
    color: white;
    letter-spacing: 0.2em;
    text-transform: uppercase;

    cursor: pointer;
    transition: background-color 0.5s;
  }
  .scroll > div span:hover {
    background-color: #4caf50;
  }

  .scroll > div {
    display: flex;
    white-space: nowrap;
    animation: animate var(--t) linear infinite;
    animation-delay: calc(var(--t) / -2);
  }
  @keyframes animate {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  .scroll > div:nth-child(2) {
    animation: animate2 var(--t) linear infinite;
  }
  @keyframes animate2 {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-200%);
    }
  }

  .scroll:hover > div {
    animation-play-state: paused;
  }
</style>
