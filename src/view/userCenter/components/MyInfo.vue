<template>
  <div class="home-container">
    <div class="home-user-body">
      <div class="user-item">
        <span class="user-item-label">头像：</span>
        <div
          class="user_icon"
          @click="uploadImg"
          v-click-log="{ module: '我的信息', operation: `上传头像` }"
        >
          <svg-icon :src="headPicture || icon.navigation_user" size="50" />
        </div>
      </div>
      <div class="user-item">
        <span class="user-item-label">账号：</span>
        <span>{{ user.userName }}</span>
      </div>
      <div class="user-item">
        <span class="user-item-label">角色：</span>
        <span>{{ getRoleName() }}</span>
      </div>
      <div class="user-item">
        <span class="user-item-label">昵称：</span>
        <b-input v-model:value="userData.alias" placeholder="请输入昵称" />
      </div>

      <div class="user-item">
        <span class="user-item-label">邮箱：</span>
        <b-input v-model:value="userData.email" placeholder="请输入邮箱" />
      </div>
    </div>
    <b-button
      class="footer-center"
      style="bottom: 20px"
      type="primary"
      @click="saveUserInfo"
      v-click-log="{ module: '我的信息', operation: `保存` }"
      >保存</b-button
    >
  </div>
</template>

<script lang="ts" setup>
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { useUserStore } from '@/store/index';
  import { onMounted, ref, watch } from 'vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import userApi from '@/api/userApi';
  import { message } from 'ant-design-vue';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import { cloneDeep } from 'lodash-es';
  import icon from '@/config/icon.ts';
  const user = useUserStore();
  const headPicture = ref<string>('');
  function uploadImg() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', function (event: any) {
      const file = event.target.files[0]; // 获取用户选择的文件
      if (file) {
        // 检查文件大小是否超过5M
        const maxFileSize = 5000 * 1024;
        if (file.size > maxFileSize) {
          message.warning('图片大小不能超过5MB');
          return; // 如果文件过大，终止函数执行
        }
        const reader = new FileReader(); // 创建FileReader对象
        reader.onload = function (e) {
          const base64 = e.target.result; // 直接获取Base64编码的字符串
          headPicture.value = base64.toString();
        };
        reader.onerror = function (error) {
          console.error('Error reading file:', error);
        };
        reader.readAsDataURL(file); // 读取文件内容，结果为Base64编码的字符串
      }
    });

    input.click(); // 触发文件选择对话框
  }

  function saveUserInfo() {
    if (!['admin', 'root'].includes(user.role)) {
      message.warn('请登录');
      return;
    }
    if (userData.value.email && !validateEmail(userData.value.email)) {
      message.warning('请输入正确的邮箱格式');
      return;
    }
    userApi
      .updateUserInfo({
        id: localStorage.getItem('userId'),
        headPicture: headPicture.value,
        alias: userData.value.alias,
        email: userData.value.email,
      })
      .then(async (res) => {
        if (res.status === 200) {
          message.success('保存成功');
          const userPromise = await userApi.getUserInfoById({ id: localStorage.getItem('userId') });
          user.setUserInfo(userPromise.data);
        }
      })
      .catch((err) => {
        console.error('后台错误：' + err);
      });
  }

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  function getRoleName() {
    const roleNames = {
      admin: '管理员',
      visitor: '游客',
      root: '超级管理员',
    };
    return roleNames[user.role] || '未知角色';
  }
  const userData = ref(cloneDeep(user));
  headPicture.value = cloneDeep(user.headPicture);
  watch(
    () => user,
    () => {
      headPicture.value = cloneDeep(user.headPicture);
      userData.value = cloneDeep(user);
    },
    {
      deep: true,
    },
  );
</script>

<style lang="less" scoped>
  .home-container {
    padding: 20px;
  }
  .home-user-body {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .user-item {
    display: flex;
    align-items: center;
    gap: 20px;
    .user-item-label {
      width: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .user_icon {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 1px solid #f5f5f5;
    border-radius: 30px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    &:hover::after {
      content: '上传头像'; /* 定义伪元素的内容 */
      position: absolute; /* 绝对定位，相对于.preview-div定位 */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5); /* 半透明的黑色背景 */
      color: white; /* 文字颜色 */
      display: flex; /* 使用flex布局使文字居中 */
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      font-size: 12px; /* 文字大小 */
    }
  }
</style>
