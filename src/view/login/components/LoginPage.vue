<template>
  <div class="view-body" :class="title !== '登录' ? 'hide' : ''">
    <div class="view-page">
      <b style="font-size: 30px; justify-self: center; color: #161824">登录</b>
      <a-form
        :label-col="{
          span: 4,
        }"
        ref="formDataRef"
        :model="formData"
      >
        <a-form-item label="" name="userName">
          <b-input theme="day" height="40px" v-model:value="formData.userName" placeholder="账号">
            <template #prefix>
              <svg-icon :src="icon.navigation_user" size="16" />
            </template>
          </b-input>
        </a-form-item>
        <a-form-item label="" name="password">
          <span class="flex-center">
            <b-input
              theme="day"
              height="40px"
              maxlength="20"
              type="password"
              placeholder="密码"
              v-model:value="formData.password"
            >
              <template #prefix>
                <svg-icon :src="icon.login_password" size="16" />
              </template>
            </b-input>
          </span>
        </a-form-item>
        <a-form-item>
          <div class="login-tips-text">
            <span class="remember-text"><b-checkbox v-model:isCheck="isCheck" />Remember Me</span>
            <span class="dom-hover forget-text" @click="title = '重置'">Forget Password?</span>
          </div>
        </a-form-item>
        <a-form-item>
          <b-button type="primary" class="handle-btn" :class="{ 'disable-btn': disable }" @click="handleLogin"
            >登录
          </b-button>
        </a-form-item>
      </a-form>

      <span class="tips-text"
        >还没有账号？前往<a style="cursor: pointer !important; color: #3b82f6; margin-left: 2px" @click="title = '注册'"
          >注册</a
        ></span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import userApi from '@/api/userApi.ts';
  import router from '@/router';
  import { message } from 'ant-design-vue';
  import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
  import { bookmarkStore, useUserStore } from '@/store';
  import { cloneDeep } from 'lodash-es';

  const title = defineModel('title');
  const formData = reactive({
    userName: '',
    password: '',
  });
  const isCheck = ref(true);
  const disable = computed(() => {
    return !formData.userName || !formData.password;
  });
  const formDataRef = ref();
  const bookmark = bookmarkStore();
  const user = useUserStore();

  async function handleLogin() {
    await formDataRef.value.validate();

    userApi
      .validateUser(formData)
      .then((res: any) => {
        if (res.status === 200) {
          localStorage.setItem('userId', res.data.id);
          localStorage.setItem('theme', res.data.theme);
          bookmark.theme = res.data?.theme || 'day';
          user.setUserInfo(res.data);
          router.push('/');
          message.success('登录成功');
          if (isCheck.value) {
            localStorage.setItem('loginInfo', JSON.stringify(formData));
          } else {
            localStorage.setItem('loginInfo', '');
          }
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
  }

  watch(
    () => isCheck.value,
    () => {
      if (!isCheck.value) {
        localStorage.setItem('loginInfo', '');
      }
    },
  );
  function enterFunc(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  }

  onMounted(() => {
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      isCheck.value = true;
      Object.assign(formData, JSON.parse(loginInfo));
    }
    document.addEventListener('keydown', enterFunc);
    localStorage.setItem('userId', '');
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', enterFunc);
  });
</script>

<style lang="less" scoped>
  .login-tips-text {
    height: 40px;
    line-height: 40px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .remember-text {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #1f1f1f !important;
  }

  .forget-text {
    font-size: 12px;
    color: var(--primary-text) !important;
  }
</style>
