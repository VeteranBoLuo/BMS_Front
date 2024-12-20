import { AppRouteRecordRaw } from '@/router';

const commonRouter: AppRouteRecordRaw[] = [
  {
    meta: {
      keepAlive: true,
      requireAuth: true,
    },
    path: '/opinions',
    name: 'opinions',
    component: () => import('@/view/configCenter/components/phone/POpinions.vue'),
  },
  {
    meta: {
      keepAlive: true,
      requireAuth: true,
    },
    path: '/myInfo',
    name: 'myInfo',
    component: () => import('@/view/configCenter/components/phone/PMyInfo.vue'),
  },
];

export default commonRouter;
