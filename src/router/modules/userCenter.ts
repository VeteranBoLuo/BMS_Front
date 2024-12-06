import { AppRouteRecordRaw } from '@/router';

const userCenterRouter: AppRouteRecordRaw = {
  meta: {
    title: '个人中心',
    keepAlive: true,
    requireAuth: true,
  },
  path: '/userCenter',
  name: 'userCenter',
  component: () => import('@/view/userCenter/userCenter.vue'),
  redirect: '/userCenter/userHome',
  children: [
    {
      path: 'userHome',
      component: () => import('@/view/userCenter/components/UserHome.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: 'myInfo',
      component: () => import('@/view/userCenter/components/MyInfo.vue'),
    },
  ],
};

export default userCenterRouter;
