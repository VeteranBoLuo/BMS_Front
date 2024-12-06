<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
  import { Column } from '@antv/g2plot';
  import { onMounted, PropType, ref } from 'vue';
  import { ColumnOptions } from '@antv/g2plot/src/plots/column/types';
  const props = defineProps({
    options: {
      type: Object as PropType<ColumnOptions> | any,
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
    const line = new Column('container', {
      ...props.options,
    });

    line.render();
  });

  function getModel() {
    return model.value;
  }
</script>

<style scoped lang="less">
  #container {
    width: 400px;
  }
</style>
