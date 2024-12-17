<template>
  <div class="view-body" :class="title !== '登录' ? 'hide' : ''">
    <span @click="bookmark.isShowLogin = false" class="dom-hover login-close-icon">
      <img src="@/assets/icons/close.svg" width="20" height="20" alt="" />
    </span>
    <div class="view-page">
      <b style="font-size: 30px; justify-self: center; color: #161824">登录</b>
      <span
        style="
          font-family: 微软雅黑;
          font-size: 12px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 60px;
          color: #a9a1ad;
        "
        >欢迎使用菠萝书签（PBM）</span
      >
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
            const params = cloneDeep(formData);
            params.password = encrypt(params.password);
            localStorage.setItem('loginInfo', JSON.stringify(params));
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
  // 加密映射表
  const encryptionMap = {
    a: '!',
    b: '@',
    c: '#',
    d: '$',
    e: '%',
    f: '^',
    g: '&',
    h: '*',
    i: 'x',
    j: ')',
    k: '-',
    l: '_',
    m: '=',
    n: '+',
    o: 'g',
    p: 'b',
    q: '{',
    r: 'j',
    s: 'x',
    t: ':',
    u: "'",
    v: '"',
    w: '<',
    x: '>',
    y: ',',
    z: '.',
    '0': ']',
    '1': 'n',
    '2': 'd',
    '3': ';',
    '4': 'u',
    '5': 'a',
    '6': '[',
    '7': 'z',
    '8': 'm',
    '9': 'e',
  };
  // 反向加密映射表
  const decryptionMap = {};
  for (const key in encryptionMap) {
    decryptionMap[encryptionMap[key]] = key;
  }
  // 加密函数
  function encrypt(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toLowerCase();
      result += encryptionMap[char] || char;
    }
    return result;
  }
  // 解密函数
  function decrypt(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += decryptionMap[char] || char;
    }
    return result;
  }

  function enterFunc(e) {
    if (disable.value) return;
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
      formData.password = decrypt(formData.password);
      console.log(formData);
    } else {
      isCheck.value = false;
    }
    document.addEventListener('keydown', enterFunc);
    localStorage.setItem('userId', '');
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', enterFunc);
  });
</script>

<style lang="less" scoped>
  :deep(:-webkit-autofill) {
    -webkit-text-fill-color: #161824 !important; //这个地方的颜色是字体颜色，可以根据实际情况修改
  }
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
