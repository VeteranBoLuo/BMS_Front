import { AppRouteRecordRaw } from '@/router';
import { RoleEnum } from '@/config/bookmarkCfg.ts';

const loginRouter: AppRouteRecordRaw = {
  meta: {
    roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
  },
  path: '/login',
  name: 'login',
  component: () => import('@/view/login/index.vue'),
};

export default loginRouter;
