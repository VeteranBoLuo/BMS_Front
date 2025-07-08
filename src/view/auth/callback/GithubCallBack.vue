<script setup>
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { useUserStore } from '@/store';

  const route = useRoute();
  const router = useRouter();
  const user = useUserStore();

  onMounted(async () => {
    const code = route.query.code;

    // 发送 code 给后端换取 Token
    try {
      const res = await axios.post('/api/user/github', { code });
      const { user_info } = res.data;
      user.setUserInfo(user_info);
      // 存储用户信息（示例）
      localStorage.setItem('userId', user_info.id);
      // location.reload();
    } catch (error) {
      console.error('登录失败', error);
    }
  });
</script>
