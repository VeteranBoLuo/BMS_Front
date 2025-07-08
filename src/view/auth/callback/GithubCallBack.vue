<script setup>
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store';
  import { apiBasePost } from '@/http/request';

  const router = useRouter();
  const user = useUserStore();
  function getHashParam(param) {
    const hash = window.location.hash; // 获取整个 hash 部分
    const url = new URL(hash, 'http://example.com'); // 构造一个虚拟 URL
    return url.searchParams.get(param); // 获取参数值
  }
  onMounted(async () => {
    let code = getHashParam('code');
    // 发送 code 给后端换取 Token
    const cRes = await apiBasePost('/api/user/github', { code });
    const { userInfo } = cRes.data;
    user.setUserInfo(userInfo);
    localStorage.setItem('userId', userInfo.id);
    const targetUrl = `${window.location.origin}/#/home`; // 目标地址
    window.history.replaceState({}, document.title, targetUrl); // 替换当前历史记录
    location.reload();
  });
  function goBack() {
    const targetUrl = `${window.location.origin}/#/home`;
    window.history.replaceState({}, document.title, targetUrl);
    location.reload();
  }
</script>
<template>
  <template>
    <div style="height: 100%; width: 100%; display: grid; place-items: center">
      <div style="margin-top: -200px; display: flex; flex-direction: column; gap: 30px; align-items: center">
        <div
          style="
            height: 200px;
            width: 200px;
            border-radius: 50%;
            border: 5px solid #ccc;
            display: grid;
            place-items: center;
            color: #ccc;
            font-size: 50px;
          "
        >
          404
        </div>
        <b style="color: #ccc"> github登录校验中...</b>
        <a @click="goBack" style="cursor: pointer"> 返回</a>
      </div>
    </div>
  </template>
</template>
