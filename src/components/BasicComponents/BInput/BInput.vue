<template>
  <div class="input-container">
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :rows="4"
      class="b_textarea"
      :value="value"
      @input="handleInput"
      @enter="$emit('enter')"
      :style="{
        paddingLeft: hasPrefixSlot ? '30px' : '11px',
        paddingRight: hasSuffixSlot ? '30px' : '11px',
      }"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      @focus="$emit('focus')"
      @focusout="$emit('focusout')"
    />
    <input
      v-else
      :id="id"
      class="b_input"
      :value="value"
      @input="handleInput"
      @enter="$emit('enter')"
      :style="{
        paddingLeft: hasPrefixSlot ? '30px' : '11px',
        paddingRight: hasSuffixSlot ? '30px' : '11px',
      }"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      @focus="$emit('focus')"
      @focusout="$emit('focusout')"
    />
    <div v-if="hasPrefixSlot" class="prefix-icon">
      <slot name="prefix"> </slot>
    </div>
    <div v-if="hasSuffixSlot" class="suffix-icon">
      <slot name="suffix"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineModel, useSlots, computed } from 'vue';
  const props = defineProps({
    id: {
      type: String,
      default: () => Math.floor(Math.random() * 9000000).toString(),
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
  });
  const value = defineModel('value');
  const emit = defineEmits(['input', 'enter', 'focus', 'focusout']);

  // 获取插槽内容
  const slots = useSlots();

  // 计算属性来判断是否有内容传递给 prefix 插槽
  const hasPrefixSlot = computed(() => {
    return !!slots.prefix;
  });

  // 计算属性来判断是否有内容传递给 suffix 插槽
  const hasSuffixSlot = computed(() => {
    return !!slots.suffix;
  });

  function handleInput(event) {
    value.value = event.target.value;
    emit('input', event.target.value);
  }
</script>
<style lang="less" scoped>
  .input-container {
    width: 100%;
    position: relative;
  }
  .b_input {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 4px 11px;
    height: 32px;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--bl-input-bg-color);
    color: var(--bl-input-color);
    &:focus {
      border: 1px solid var(--bl-input-border-h-color);
      box-shadow: 0 0 0 2px rgba(92, 90, 86, 0.1);
    }
    &:hover {
      border: 1px solid var(--bl-input-border-h-color);
    }
    &:active {
      border: 1px solid var(--bl-input-border-h-color);
    }
    outline: none;
  }
  .b_textarea {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 4px 11px;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--bl-input-bg-color);
    color: var(--bl-input-color);
    font-family: '微软雅黑 Light', serif;
    &:focus {
      border: 1px solid var(--bl-input-border-h-color);
      box-shadow: 0 0 0 2px rgba(92, 90, 86, 0.1);
    }
    &:hover {
      border: 1px solid var(--bl-input-border-h-color);
    }
    &:active {
      border: 1px solid var(--bl-input-border-h-color);
    }
    outline: none;
  }

  .prefix-icon {
    position: absolute;
    left: 10px;
    top: 0;
    width: 16px;
    height: 100%;
    display: grid;
    place-items: center;
  }
  .suffix-icon {
    position: absolute;
    right: 10px;
    top: 0;
    width: 16px;
    height: 100%;
    display: grid;
    place-items: center;
  }
  input:-internal-autofill-selected {
    box-shadow: 0 0 0 1000px var(--background-color) inset;
    caret-color: var(--text-color);
    -webkit-text-fill-color: var(--text-color);
  }
</style>
