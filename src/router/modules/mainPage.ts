import { AppRouteRecordRaw } from '@/router';
import { RoleEnum } from '@/config/bookmarkCfg.ts';

const mainPageRouter: AppRouteRecordRaw = {
  path: 'home',
  meta: {
    title: '首页',
    keepAlive: true,
    requireAuth: true,
    roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
  },
  children: [
    {
      path: '',
      component: () => import('@/view/home/Home.vue'),
    },
    {
      path: ':id',
      component: () => import('@/view/home/Home.vue'),
    },
    {
      path: 'search/:value(.*)',
      component: () => import('@/view/home/Home.vue'),
    },
  ],
};

export default mainPageRouter;
