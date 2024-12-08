<template>
  <a-tooltip
    :color="bookmark.theme === 'day' ? '#ffffff' : '#252632'"
    placement="bottomLeft"
    :get-popup-container="getPopupContainer"
    v-model:open="userVisible"
  >
    <template #title>
      <div class="flex-align-center" style="gap: 15px">
        <div
          :class="['navigation-icon']"
          @click="router.push('/userCenter'), (userVisible = false)"
        >
          <svg-icon size="40" :src="user.headPicture || icon.navigation_user" class="icon-hover" />
        </div>
        <div class="user-icon-text" :style="{ color: bookmark.iconColor }">
          <div>{{ user.userName ? user.alias || '默认昵称' : '请登录' }}</div>
          <div style="display: flex; gap: 20px">
            <span
              >标签<span style="margin-left: 5px">{{ user.tagTotal }}</span></span
            >
            <span
              >书签<span style="margin-left: 5px">{{ user.bookmarkTotal }}</span></span
            >
          </div>
        </div>
      </div>
      <hr />
      <ul class="header_menu_ul">
        <li class="flex-center" @click="handleAdmin" v-if="user.role === 'root'">
          <svg-icon size="16" :src="icon.user_admin" />
          后台管理
        </li>
        <li class="flex-center" @click="handleManageData">
          <svg-icon size="16" :src="icon.user_manage" />
          配置中心
        </li>
        <li class="flex-center" @click="(opinionsVisible = true), (userVisible = false)">
          <svg-icon size="16" :src="icon.user_manage" />
          意见反馈
        </li>
        <li class="flex-center" @click="handleExitLogin">
          <svg-icon size="16" :src="icon.user_exit" />
          退出登录
        </li>
      </ul>
    </template>
    <div :class="['navigation-icon']">
      <svg-icon size="30" :src="user.headPicture || icon.navigation_user" class="icon-hover" />
    </div>
    <b-modal
      :mask-closable="false"
      title="意见反馈"
      :visible="opinionsVisible"
      @close="opinionsVisible = false"
    >
      <div :style="{ width: bookmark.isPhone ? '95%' : '450px' }">
        <div class="opinionType">
          <div style="font-size: 14px">反馈类型</div>
          <b-radio
            style="margin-top: 10px"
            v-model:value="opinionData.opinionType"
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
            <b-upload accept="image/*" @change="uploadImg">
              <div
                style="width: 80px; height: 80px; color: #6c7074; border-radius: 8px"
                :style="{
                  backgroundColor: bookmark.theme === 'day' ? '#F5F5F5' : '#2e2f3b',
                  border: bookmark.theme === 'day' ? '1px dashed #ccc' : '',
                }"
                class="flex-center icon-hover"
              >
                <svg-icon size="30" :src="icon.file_upload" />
              </div>
            </b-upload>
            <div v-for="(item,index) in opinionData.imgArray" style="position: relative;width: 80px; height: 80px;box-sizing: border-box">
              <img :src="item" style="width: 80px; height: 80px;box-sizing: border-box" alt="" />
              <span style="position: absolute;right: 10px;top:0;z-index: 9;font-size: 14px;color: red" @click="opinionData.imgArray.splice(index,1)" class="icon-hover">x</span>
            </div>
          </div>
          <div style="margin-top: 10px">
            <div style="font-size: 14px">联系方式</div>
            <b-input
              v-model:value="opinionData.phone"
              style="margin-top: 10px"
              placeholder="请输入电话便于联系"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <b-button
          type="danger"
          style="width: 100%; margin-top: 20px"
          @click="submit"
          v-click-log="{ module: '意见反馈', operation: JSON.stringify(opinionData) }"
          >提交</b-button
        >
      </template>
    </b-modal>
  </a-tooltip>
</template>

<script setup lang="ts">
  import router from '@/router';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { bookmarkStore, useUserStore } from '@/store';
  import Alert from '@/components/BasicComponents/BModal/Alert.ts';
  import { reactive, ref } from 'vue';
  import BModal from '@/components/BasicComponents/BModal/BModal.vue';
  import BRadio from '@/components/BasicComponents/BRadio/BRadio.vue';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import BUpload from '@/components/BasicComponents/BUpload/BUpload.vue';
  import { message } from 'ant-design-vue';

  const bookmark = bookmarkStore();
  const getPopupContainer = (trigger: HTMLElement) => {
    return document.getElementById('tag-container');
  };
  const userVisible = ref(false);

  function handleAdmin() {
    userVisible.value = false;
    router.push('/admin');
  }

  function handleManageData() {
    userVisible.value = false;
    router.push('/manage');
  }

  const opinionsVisible = ref(false);

  const user = useUserStore();

  function handleExitLogin() {
    userVisible.value = false;
    Alert.alert({
      title: '提示',
      content: '此操作将退出登录, 是否继续?',
      onOk() {
        router.push('/login');
        bookmark.reset();
      },
    });
  }

  const opinionData = reactive({
    opinionType: '产品建议',
    content: '',
    imgArray: [],
    phone: '',
  });

  function uploadImg(event) {
    if (bookmark.isPhone) {
      if (opinionData.imgArray.length === 2) {
        opinionData.imgArray.shift();
        opinionData.imgArray.push(event);
      } else {
        opinionData.imgArray.push(event);
      }
    } else {
      if (opinionData.imgArray.length === 3) {
        opinionData.imgArray.shift();
        opinionData.imgArray.push(event);
      } else {
        opinionData.imgArray.push(event);
      }
    }
  }

  function submit() {
    if (opinionData.content.length < 6) {
      message.warning('请输入不少于6字的问题描述');
      return;
    }
    message.success('感谢您的反馈');
    opinionsVisible.value = false;
  }
</script>

<style scoped lang="less">
  .navigation-icon {
    display: flex;
    align-items: center;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;
  }

  .header_menu_ul {
    color: black;
    list-style-type: none;
    text-align: center;
    margin: 5px 0 0 0;
    padding: 2px;
    box-sizing: border-box;
    width: 220px;
    li {
      width: 100%;
      height: 30px;
      cursor: pointer;
      font-size: 14px;
      border-radius: 4px;
      background-color: var(--menu-item-bg-color);
      color: var(--text-color);
      margin-bottom: 5px;
      gap: 10px;

      &:hover {
        background-color: var(--menu-item-h-bg-color);
      }
    }
  }
  .user-icon-text {
    text-align: left;
  }

  @media (max-width: 600px) {
    .header_menu_ul {
      width: 180px;
    }
  }
</style>
