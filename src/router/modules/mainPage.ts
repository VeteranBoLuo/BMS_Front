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
      component: () => import('@/view/tag/components/mainPage.vue'),
    },
    {
      path: ':id',
      component: () => import('@/view/tag/components/mainPage.vue'),
    },
    {
      path: 'search/:value',
      component: () => import('@/view/tag/components/mainPage.vue'),
    },
    {
      path: 'edit',
      name: 'edit',
      component: () => import('@/view/manage/components/pc/TagTable.vue'),
    },
  ],
};

export default mainPageRouter;
