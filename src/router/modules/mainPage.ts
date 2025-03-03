import { AppRouteRecordRaw } from '@/router';

const mainPageRouter: AppRouteRecordRaw = {
  path: 'home',
  meta: {
    title: '首页',
    keepAlive: true,
    requireAuth: true,
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
    {
      path: 'edit',
      name: 'edit',
      component: () => import('@/view/manage/components/desktop/TagTable.vue'),
    },
  ],
};

export default mainPageRouter;
