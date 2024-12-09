<template>
  <teleport to="body">
    <div class="login-container">
      <div class="login-view" :class="{ flip: isFlipped }">
        <div class="front-login">
          <span @click="bookmark.isShowLogin = false" class="icon-hover login-close-icon">
            <img src="@/assets/icons/close.svg" width="20" height="20" alt="" />
          </span>
          <div class="view-page">
            <b style="font-size: 30px; justify-self: center; color: #161824">登录</b>
            <a-form :label-col="{ span: 4 }" ref="userFormRef" :model="userFormData">
              <a-form-item
                label=""
                name="userName"
                :rules="[{ required: true, message: '请输入账号' }]"
              >
                <a-input
                  style="height: 40px"
                  v-model:value="userFormData.userName"
                  placeholder="账号"
                >
                  <template #prefix>
                    <svg-icon :src="icon.navigation_user" size="16" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                label=""
                name="password"
                :rules="[{ required: true, message: '请输入密码' }]"
              >
                <span class="flex-center">
                  <a-input
                    style="height: 40px"
                    maxlength="20"
                    type="password"
                    placeholder="密码"
                    v-model:value="userFormData.password"
                  >
                    <template #prefix>
                      <svg-icon :src="icon.login_password" size="16" />
                    </template>
                  </a-input>
                </span>
              </a-form-item>
              <a-form-item>
                <div
                  style="
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    padding: 0 5px;
                    box-sizing: border-box;
                  "
                >
                  <span
                    style="
                      font-size: 12px;
                      display: flex;
                      align-items: center;
                      gap: 5px;
                      color: #1f1f1f !important;
                    "
                    ><b-checkbox v-model:isCheck="isCheck" />Remember Me</span
                  >
                  <span style="font-size: 12px; color: #ccc !important" class="icon-hover"
                    >Forget Password?</span
                  >
                </div>
              </a-form-item>
            </a-form>
            <b-button type="primary" @click="handleToPage" class="handle-btn">登录</b-button>
            <span class="tips-text">还没有账号？前往<a @click="toRegister">注册</a></span>
          </div>
        </div>
        <div class="back-register">
          <span @click="bookmark.isShowLogin = false" class="icon-hover login-close-icon">
            <img src="@/assets/icons/close.svg" width="20" height="20" alt="" />
          </span>
          <div class="view-page">
            <b style="font-size: 30px; justify-self: center; color: #161824">注册</b>
            <a-form :label-col="{ span: 4 }" ref="userFormRef2" :model="userFormData">
              <a-form-item
                label=""
                name="userName"
                :rules="[
                  { required: true, message: '请输入账号' },
                  { max: 12, message: '账号长度不能超过12个字符' },
                  { min: 6, message: '账号长度不能少于6个字符' },
                ]"
              >
                <a-input
                  style="height: 40px"
                  v-model:value="userFormData.userName"
                  placeholder="账号"
                >
                  <template #prefix>
                    <svg-icon :src="icon.navigation_user" size="16" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                label=""
                name="password"
                :rules="[
                  { required: true, message: '请输入密码' },
                  { max: 15, message: '密码长度不能超过15个字符' },
                  { min: 6, message: '密码长度不能少于6个字符' },
                ]"
              >
                <span class="flex-center">
                  <a-input
                    style="height: 40px"
                    maxlength="20"
                    type="password"
                    placeholder="密码"
                    v-model:value="userFormData.password"
                  >
                    <template #prefix>
                      <svg-icon :src="icon.login_password" size="16" />
                    </template>
                  </a-input>
                </span>
              </a-form-item>
              <a-form-item
                label=""
                name="email"
                :rules="[{ type: 'email', message: '请输入正确的邮箱格式' }]"
              >
                <a-input style="height: 40px" v-model:value="userFormData.email" placeholder="邮箱">
                  <template #prefix>
                    <svg-icon :src="icon.login_email" size="16" />
                  </template>
                </a-input>
              </a-form-item>
            </a-form>
            <b-button type="primary" @click="handleToPage" class="handle-btn">注册</b-button>
            <span class="tips-text">已有账号？前往<a @click="title = '登录'">登录</a></span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import router from '@/router';
  import { message } from 'ant-design-vue';
  import userApi from '@/api/userApi';
  import { bookmarkStore, useUserStore } from '@/store';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';

  // 是否反转
  const isFlipped = ref(false);
  const title = ref('登录');

  watch(
    () => title.value,
    (val) => {
      isFlipped.value = !isFlipped.value;
    },
  );

  // 是否勾选保存登录信息
  const isCheck = ref(false);
  const user = useUserStore();

  const userFormData: any = ref({
    userName: '',
    password: '',
    email: '',
  });

  const toRegister = () => {
    title.value = '注册';
    userFormData.value = {
      userName: '',
      password: '',
      email: '',
      role: 'admin',
    };
  };

  const userFormRef = ref();
  const userFormRef2 = ref();
  const handleToPage = async () => {
    try {
      if (title.value === '登录') {
        await userFormRef.value.validate();
        if (isCheck.value) {
          localStorage.setItem('loginInfo', JSON.stringify(userFormData.value));
        } else {
          localStorage.setItem('loginInfo', '');
        }
        userApi
          .validateUser(userFormData.value)
          .then((res: any) => {
            if (res.status === 200) {
              localStorage.setItem('userId', res.data.id);
              localStorage.setItem('theme', res.data.theme);
              bookmark.theme = res.data?.theme || 'day';
              user.setUserInfo(res.data);
              router.push('/');
              message.success('登录成功');
              bookmark.isShowLogin = false;
              bookmark.type = 'all';
              bookmark.refreshTag();
            } else {
              message.error(res.msg);
            }
          })
          .catch((e) => {
            message.error(e.message);
          });
      } else {
        await userFormRef2.value.validate();
        userFormData.value.role = 'admin';
        userApi.registerUser(userFormData.value).then((res: any) => {
          if (res.status === 200) {
            message.success('注册成功');
            title.value = '登录';
          } else {
            message.error(res.msg);
          }
        });
      }
    } catch (e) {}
  };

  const bookmark = bookmarkStore();

  function enterFunc(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleToPage();
    }
  }

  onMounted(() => {
    document.addEventListener('mouseup', closeMask);
    document.addEventListener('keydown', clickEsc);
    document.addEventListener('keydown', enterFunc);
    localStorage.setItem('userId', '');
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      isCheck.value = true;
      userFormData.value = JSON.parse(loginInfo);
    }
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', enterFunc);
    document.removeEventListener('mouseup', closeMask);
    document.addEventListener('keydown', clickEsc);
  });

  function closeMask(e) {
    if (typeof e?.target?.className === 'string') {
      if (e.target.className === 'login-container') {
        bookmark.isShowLogin = false;
      }
    }
  }

  function clickEsc(e) {
    if (e.keyCode === 27) {
      bookmark.isShowLogin = false;
    }
  }
</script>

<style scoped>
  .login-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    animation: in-animation 0.3s ease;
  }

  .login-view {
    width: 450px;
    height: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .front-login,
  .back-register {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    backface-visibility: hidden;
    transition: transform 0.6s;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-image: var(--bg-image2);
  }

  .view-page {
    padding: 20px;
    border-radius: 6px;
    display: grid;
    height: 100%;
  }

  .tips-text {
    font-size: 14px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    a {
      cursor: pointer;
      color: #3b82f6;
      margin-left: 2px;
    }
  }

  .handle-btn {
    width: 80%;
    justify-self: center;
    position: relative;
    bottom: 50px;
    color: white !important;
  }

  .front-login {
    transform: rotateY(0deg);
  }

  .back-register {
    transform: rotateY(180deg);
  }

  .flip .front-login {
    transform: rotateY(-180deg);
  }

  .flip .back-register {
    transform: rotateY(0deg);
  }

  :deep(.ant-form-item .ant-form-item-label) {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .login-close-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 99999;
    font-size: 20px;
  }

  @keyframes in-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @media (max-width: 600px) {
    .login-view {
      height: 500px;
    }
    .front-login,
    .back-register {
      height: 80%;
      width: 80%;
    }
  }
</style>
