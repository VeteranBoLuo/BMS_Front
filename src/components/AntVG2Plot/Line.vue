<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
  import { Line } from '@antv/g2plot';
  import { onMounted, PropType, ref } from 'vue';
  import { LineOptions } from '@antv/g2plot/src/plots/line/types';
  const props = defineProps({
    options: {
      type: Object as PropType<LineOptions> | any,
    },
    propId: {
      type: String,
      default: '0',
    },
  });
  defineExpose({
    getModel,
  });
  const model = ref();
  onMounted(() => {
    const line = new Line('container', {
      ...props.options,
    });

    line.render();
  });

  function getModel() {
    return model.value;
  }
</script>
