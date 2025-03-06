<template>
  <BModal v-model:visible="visible" title="笔记标签配置" :mask-closable="false" @ok="saveTag">
    <div class="config-container">
      <div class="flex-align-center-gap">
        <b-input :maxlength="5" placeholder="请输入标签，最多可关联3个标签" v-model:value="tagValue" /><b-button
          @click="setTag"
          >{{ currentTag !== -1 ? '更新' : '添加' }}</b-button
        >
      </div>
      <VueDraggable v-model="tagList" class="note-tag-list" :animation="150">
        <div class="note-tag" v-for="tag in tagList" @click="tagUpdate(tag)" :key="tag">
          <div>{{ tag }}</div>
          <svg-icon :src="icon.common.close" class="dom-hover-click" @click.stop="delTag(tag)" />
        </div>
      </VueDraggable>
      <div style="font-size: 12px; color: var(--desc-color); margin-top: 10px">点击标签文本即可重新编辑标签</div>
    </div>
  </BModal>
</template>

<script lang="ts" setup>
  import BModal from '@/components/BasicComponents/BModal/BModal.vue';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import { inject, onMounted, ref, watch } from 'vue';
  import { checkEndCondition, endCondition } from '@/utils/validator.ts';
  import { VueDraggable } from 'vue-draggable-plus';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import icon from '@/config/icon.ts';

  const visible = defineModel('visible');

  const tagList = ref<any>([]);
  const tagValue = ref('');
  function setTag() {
    const condition: endCondition[] = [
      {
        endCondition: currentTag.value === -1 && tagList.value.length >= 3,
        message: '最多只能关联3个标签！',
      },
      {
        endCondition: !tagValue.value,
        message: '内容不能为空！',
      },
      {
        endCondition: checkUnique(),
        message: '标签已经存在！',
      },
    ];
    if (checkEndCondition(condition)) {
      return;
    }
    if (currentTag.value === -1) {
      tagList.value.push(tagValue.value);
    } else {
      tagList.value[currentTag.value] = tagValue.value;
    }
    tagValue.value = '';
    currentTag.value = -1;
  }
  const currentTag = ref(-1);
  function tagUpdate(tag) {
    tagValue.value = tag;
    currentTag.value = tagList.value.indexOf(tag);
  }

  function delTag(tag) {
    const delIndex = tagList.value.indexOf(tag);
    // 如果删除的是正在编辑的标签，则取消编辑态再删除
    if (tagList.value[currentTag.value] === tagList.value[delIndex]) {
      currentTag.value = -1;
    }
    tagList.value.splice(tagList.value.indexOf(tag), 1);
  }

  function checkUnique() {
    if (currentTag.value !== -1) {
      if (tagList.value.includes(tagValue.value)) {
        return tagList.value.indexOf(tagValue.value) !== currentTag.value;
      }
      return false;
    }
    return tagList.value.includes(tagValue.value);
  }

  const note: any = inject('note');
  const emit = defineEmits(['saveTag']);
  function saveTag() {
    note.tags = JSON.stringify(tagList.value);
    visible.value = false;
    emit('saveTag');
  }


  onMounted(() => {
    if (note.tags) {
      tagList.value = JSON.parse(note.tags);
    }
  });
</script>

<style lang="less">
  .config-container {
    height: 100px;
  }
  .note-tag-list {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    height: 28px;
  }
  .note-tag {
    cursor: move;
    border: 1px solid #ccc;
    width: max-content;
    padding: 2px 6px;
    border-radius: 6px;
    display: flex;
    gap: 5px;
    align-items: center;
    text-align: center;
    font-size: 14px;
    box-sizing: border-box;
    color: var(--text-color);
  }
</style>
