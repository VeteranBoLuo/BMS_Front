import { AppRouteRecordRaw } from '@/router';

const loginRouter: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/view/login/login.vue'),
};

export default loginRouter;
