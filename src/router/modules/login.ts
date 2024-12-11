import { AppRouteRecordRaw } from '@/router';

const loginRouter: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/view/login/index.vue'),
};

export default loginRouter;
