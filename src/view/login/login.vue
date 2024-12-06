<template>
  <div class="login-container">
    <div class="login-view" :class="{ flip: isFlipped }">
      <div class="front-login">
        <div class="view-page">
          <b style="font-size: 30px; justify-self: center">登录</b>
          <a-form :label-col="{ span: 3 }" ref="userFormRef" :model="userFormData">
            <a-form-item
              label="账号"
              name="userName"
              :rules="[{ required: true, message: '请输入账号' }]"
            >
              <a-input style="height: 40px" v-model:value="userFormData.userName" />
            </a-form-item>
            <a-form-item
              label="密码"
              name="password"
              :rules="{ required: true, message: '请输入密码' }"
            >
              <span class="flex-center">
                <a-input
                  style="height: 40px"
                  type="password"
                  v-model:value="userFormData.password"
                />
                <div
                  v-show="title === '登录'"
                  style="cursor: pointer; position: absolute; right: 0px"
                >
                  <span style="color: #ccc">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                  <span style="color: #ccc; margin-right: 5px" @click="handleInsertTest"
                    >填入测试账号</span
                  >
                </div>
              </span>
            </a-form-item>
            <a-form-item>
              <div
                style="
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                  padding: 0 10px 0 20px;
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
                <span style="font-size: 12px; color: #1f1f1f !important" class="icon-hover"
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
        <div class="view-page">
          <b style="font-size: 30px; justify-self: center">注册</b>
          <a-form :label-col="{ span: 3 }" ref="userFormRef2" :model="userFormData">
            <a-form-item
              label="账号"
              name="userName"
              :rules="[
                { required: true, message: '请输入账号' },
                { max: 12, message: '账号长度不能超过12个字符' },
                { min: 6, message: '账号长度不能少于6个字符' },
              ]"
            >
              <a-input style="height: 40px" v-model:value="userFormData.userName" />
            </a-form-item>
            <a-form-item
              label="密码"
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
                  type="password"
                  v-model:value="userFormData.password"
                />
              </span>
            </a-form-item>
            <a-form-item
              label="邮箱"
              name="email"
              :rules="[{ type: 'email', message: '请输入正确的邮箱格式' }]"
            >
              <a-input style="height: 40px" v-model:value="userFormData.email" />
            </a-form-item>
          </a-form>
          <b-button @click="handleToPage" class="handle-btn">注册</b-button>
          <span class="tips-text">已有账号？前往<a @click="title = '登录'">登录</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import router from '@/router';
  import { message } from 'ant-design-vue';
  import userApi from '@/api/userApi';
  import { bookmarkStore, useUserStore } from '@/store';

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
    userName: 'test',
    password: '123456',
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

  function handleInsertTest() {
    userFormData.value = {
      userName: 'test',
      password: '123456',
      email: '',
    };
  }

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
              bookmark.theme = res.data?.theme || 'day';
              user.setUserInfo(res.data);
              router.push('/');
              message.success('登录成功');
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
  bookmark.theme = 'day';

  function enterFunc(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleToPage();
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', enterFunc);
    localStorage.setItem('userId', '');
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      isCheck.value = true;
      userFormData.value = JSON.parse(loginInfo);
    }
    bookmark.reset();
    document.documentElement.setAttribute('data-theme', 'day');
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', enterFunc);
  });
</script>

<style scoped>
  .login-container {
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
  }

  .login-view {
    box-sizing: border-box;
    border-radius: 50%;
    margin: 0 auto;
    background: transparent;
    position: relative;
    height: 90%;
    width: 50vw;
    box-shadow:
      inset 15px 10px 40px rgba(158, 158, 158, 0.303),
      10px 10px 20px rgba(117, 117, 117, 0.3),
      15px 15px 30px rgba(72, 70, 70, 0.193),
      inset -10px -10px 20px rgba(233, 229, 229, 0.873);
    animation: move 4s linear infinite;
  }

  @keyframes move {
    50% {
      border-radius: 42% 58% 49% 51% / 52% 36% 64% 48%;
    }
    75% {
      border-radius: 52% 48% 49% 51% / 43% 49% 51% 57%;
    }
    25% {
      border-radius: 52% 48% 59% 41% / 43% 49% 51% 57%;
    }
  }

  .view-page {
    padding: 20px;
    border-radius: 6px;
    display: grid;
    height: 100%;
  }

  .tips-text {
    font-size: 12px;
    position: absolute;
    right: 10px;
    bottom: 10px;

    a {
      cursor: pointer;
      color: #3b82f6;
      margin-left: 2px;
    }
  }

  .handle-btn {
    justify-self: center;
    position: relative;
    bottom: 50px;
    color: white !important;
    background-color: #4e4b46 !important;
  }

  .front-login,
  .back-register {
    width: 52%;
    backface-visibility: hidden;
    transition: transform 0.6s;
    position: absolute;
    height: 400px;
    left: 25%;
    top: 25%;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
    border-radius: 8px;
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

  @media (max-width: 600px) {
    .login-view {
      width: 100%;
      height: 100%;
      box-shadow: unset;
    }
    .front-login,
    .back-register {
      width: 80%;
      height: 50%;
      left: 10%;
    }
  }
</style>
