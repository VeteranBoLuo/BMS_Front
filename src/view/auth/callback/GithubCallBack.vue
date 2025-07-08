<script setup>
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    const code = route.query.code;
    const state = route.query.state;

    // 验证 state 防止 CSRF
    if (!state || state !== localStorage.getItem('github_state')) {
      alert('no');
      router.push('/login');
      return;
    }
    // 发送 code 给后端换取 Token
    try {
      alert('code');

      const res = await axios.post('/api/user/github', { code });
      const { access_token, user_info } = res.data;

      // 存储用户信息（示例）
      localStorage.setItem('user', JSON.stringify(user_info));
      router.push('/home');
    } catch (error) {
      console.error('登录失败', error);
    }
  });
</script>
