import { AppRouteRecordRaw } from '@/router';
import { RoleEnum } from '@/config/bookmarkCfg.ts';

const cloudSpaceRouter: AppRouteRecordRaw[] = [
  {
    meta: {
      title: '云空间',
      keepAlive: true,
      requireAuth: true,
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/cloudSpace',
    name: 'cloudSpace',
    component: () => import('@/view/cloudSpace/cloudSpace.vue'),
  },
];

export default cloudSpaceRouter;
