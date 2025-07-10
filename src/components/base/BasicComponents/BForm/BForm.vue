<template>
  <div class="form-container">
    <div class="form-item" v-for="field in Fields">
      <div :style="{ flex: labelCol }" class="form-item-label">
        <svg-icon
          v-if="field.required"
          class="required-icon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIgMkM2LjUgMiAyIDYuNSAyIDEyczQuNSAxMCAxMCAxMHMxMC00LjUgMTAtMTBTMTcuNSAyIDEyIDJtMCAxOGMtNC4zOSAwLTgtMy42MS04LThzMy42MS04IDgtOHM4IDMuNjEgOCA4cy0zLjYxIDgtOCA4bTEtOS43M2wyLjgzLTEuNjRsMSAxLjc0TDE0IDEybDIuODMgMS42M2wtMSAxLjc0TDEzIDEzLjczVjE3aC0ydi0zLjI3bC0yLjgzIDEuNjRsLTEtMS43NEwxMCAxMmwtMi44My0xLjYzbDEtMS43NEwxMSAxMC4yN1Y3aDJ6IiAvPgo8L3N2Zz4="
        />
        {{ field.label }}:
      </div>
      <div :style="{ flex: wrapperCol }" class="form-item-content">
        <component
          :is="field.render"
          v-if="field.render !== undefined"
          v-model:value="formData[field.name]"
          allow-clear
          style="width: 100%"
          :disabled="field.disabled"
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode;
            }
          "
          :placeholder="field.placeholder"
        ></component>
        <b-input  v-else v-model:value="formData[field.name]" :placeholder="field.placeholder" />
        <span class="require-tip" :class="{ showReqMsg: field.showRequire }"
          >{{ field.label }}必填！</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BInput from '@/components/base/BasicComponents/BInput.vue';
  import { BaseFormItem } from '@/config/formConfig.ts';
  import { onMounted, ref, watch } from 'vue';
  import SvgIcon from '@/components/base/SvgIcon/src/SvgIcon.vue';

  const props: any = withDefaults(
    defineProps<{
      formId: string;
      formData: object;
      fields: BaseFormItem[];
      rules?: object;
      layout?: 'horizontal' | 'vertical' | 'inline';
      labelCol?: number;
      wrapperCol?: number;
    }>(),
    {
      layout: 'vertical',
      labelCol: 4,
      wrapperCol: 20,
    },
  );
  const Fields = ref(props.fields);
  const FormData = ref(props.formData);
  // 校验是否为空
  function validateForm() {
    let isPass = true;
    Fields.value.forEach((field) => {
      // 当数据为undefined、''和[]时触发
      if (
        field.required &&
        (!props.formData[field.name] || props.formData[field.name]?.length === 0)
      ) {
        const type = Object.prototype.toString.call(FormData.value[field.name]);
        if (type === '[object Array]') {
          FormData.value[field.name] = [];
        } else {
          FormData.value[field.name] = '';
        }
        field.showRequire = true;
        isPass = false;
      }
    });
    return isPass;
  }

  watch(
    () => props.formData,
    () => {
      Fields.value.forEach((field) => {
        if (field.required) {
          // 主要用于校验输入框内容发生变化后的校验，只有为''和[]时触发，初始化时数据默认undefined不触发
          field.showRequire = props.formData[field.name]?.length === 0;
        }
      });
    },
    {
      deep: true,
    },
  );
  const loadDom = ref(false);
  onMounted(() => {
    loadDom.value = true;
  });
  defineExpose({
    validateForm,
  });
</script>

<style lang="less" scoped>
  .form-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  .form-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 10px;
    :deep(.b-input) {
      height: 30px;
    }
    .form-item-label {
      text-align: right;
      position: relative;
    }
  }
  .form-item-content {
    position: relative;
  }
  .required-icon {
    color: var(--require-tip-color);
    position: relative;
    top: 3px;
  }
  .require-tip {
    font-size: 12px;
    color: var(--require-tip-color);
    position: absolute;
    top: 33px;
    display: flex;
    opacity: 0;
  }

  .showReqMsg {
    animation: showReqMsg-animation 0.3s ease;
    opacity: 1;
  }
  @keyframes showReqMsg-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
