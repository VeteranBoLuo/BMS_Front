import { AppRouteRecordRaw } from '@/router';
import { RoleEnum } from '@/config/bookmarkCfg.ts';

const phoneRouter: AppRouteRecordRaw[] = [
  {
    meta: {
      keepAlive: true,
      requireAuth: true,
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/opinions',
    name: 'opinions',
    component: () => import('@/view/configCenter/opinions/POpinions.vue'),
  },
  {
    meta: {
      keepAlive: true,
      requireAuth: true,
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/myInfo',
    name: 'myInfo',
    component: () => import('@/view/configCenter/myInfo/PMyInfo.vue'),
  },
];

export default phoneRouter;
