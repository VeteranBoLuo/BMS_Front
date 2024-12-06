<template>
    <div id="container"></div>
</template>

<script lang="ts" setup>
import { Area } from '@antv/g2plot';
import { onMounted, PropType, ref } from 'vue';
import { AreaOptions } from '@antv/g2plot/src/plots/area/types';
const props = defineProps({
    options: {
        type: Object as PropType<AreaOptions> | any,
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
    const line = new Area('container', {
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
