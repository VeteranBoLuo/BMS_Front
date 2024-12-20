<template>
  <b-modal :mask-closable="false" title="意见反馈" :visible="visible" @close="visible = false">
    <div :style="{ width: bookmark.isPhone ? '95%' : '450px' }">
      <div class="type">
        <div style="font-size: 14px">反馈类型</div>
        <b-radio
          style="margin-top: 10px"
          v-model:value="opinionData.type"
          :options="[
            { label: '产品建议', value: '产品建议' },
            { label: '功能故障', value: '功能故障' },
            { label: '其他问题', value: '其他问题' },
          ]"
        />
        <b-input
          style="margin-top: 20px"
          type="textarea"
          v-model:value="opinionData.content"
          placeholder="请输入不少于6字的问题描述"
        />
        <div class="flex-align-center" style="gap: 20px; margin-top: 20px">
          <b-upload multiple accept="image/*" @change="uploadImg" />
          <div v-for="(item, index) in opinionData.imgArray" class="img-item">
            <img :src="item" style="width: 80px; height: 80px; box-sizing: border-box" alt="" />
            <div
              style="
                position: absolute;
                right: 5px;
                top: 5px;
                z-index: 9;
                font-size: 14px;
                padding: 2px;
                background-color: rgba(0, 0, 0, 0.6);
                border-radius: 50%;
                height: 13px;
                width: 13px;
              "
              @click="opinionData.imgArray.splice(index, 1)"
              class="opinion-close-icon"
              ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M16.95 8.464a1 1 0 0 0-1.414-1.414L12 10.586L8.464 7.05A1 1 0 1 0 7.05 8.464L10.586 12L7.05 15.536a1 1 0 1 0 1.414 1.414L12 13.414l3.536 3.536a1 1 0 1 0 1.414-1.414L13.414 12z"
                /></svg
            ></div>
          </div>
        </div>
        <div style="margin-top: 10px">
          <div style="font-size: 14px">联系方式</div>
          <b-input v-model:value="opinionData.phone" style="margin-top: 10px" placeholder="请输入电话便于联系" />
        </div>
      </div>
    </div>
    <template #footer>
      <b-button
        type="primary"
        style="width: 100%; margin-top: 20px"
        @click="submit"
        v-click-log="{ module: '意见反馈', operation: '提交反馈' }"
        >提交</b-button
      >
    </template>
  </b-modal>
</template>

<script setup lang="ts">
  import BRadio from '@/components/BasicComponents/BRadio/BRadio.vue';
  import BModal from '@/components/BasicComponents/BModal/BModal.vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import BUpload from '@/components/BasicComponents/BUpload/BUpload.vue';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import { bookmarkStore } from '@/store';
  import { reactive, Ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { apiBasePost } from '@/http/request.ts';

  const visible = <Ref<boolean>>defineModel('visible');
  const bookmark = bookmarkStore();

  const opinionData = reactive({
    type: '产品建议',
    content: '',
    imgArray: [],
    phone: '',
  });

  function uploadImg(event) {
    event.forEach((img) => {
      if (bookmark.isPhone) {
        if (opinionData.imgArray.length === 2) {
          opinionData.imgArray.shift();
          opinionData.imgArray.push(img);
        } else {
          opinionData.imgArray.push(img);
        }
      } else {
        if (opinionData.imgArray.length === 3) {
          opinionData.imgArray.shift();
          opinionData.imgArray.push(img);
        } else {
          opinionData.imgArray.push(img);
        }
      }
    });
  }

  function submit() {
    visible.value = false;
    if (opinionData.content.length < 6) {
      message.warning('请输入不少于6字的问题描述');
      return;
    }
    const params: any = cloneDeep(opinionData);
    params.imgArray = JSON.stringify(params.imgArray);
    apiBasePost('/api/common/recordOpinion', params)
      .then((res) => {
        if (res.status === 200) {
          message.success('感谢您的反馈');
        }
      })
      .finally(() => {
        visible.value = false;
      });
  }
</script>

<style lang="less" scoped>
.img-item {
  position: relative;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  &:hover {
    .opinion-close-icon {
      opacity: 1;
    }
  }
}
.opinion-close-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}
</style>
