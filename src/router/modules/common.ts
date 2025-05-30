import { AppRouteRecordRaw } from '@/router';
import { RoleEnum } from '@/config/bookmarkCfg.ts';

const commonRouter: AppRouteRecordRaw[] = [
  {
    meta: {
      title: '帮助文档',
      keepAlive: true,
      requireAuth: true,
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/help',
    name: 'help',
    component: () => import('@/view/configCenter/help/HelpMg.vue'),
  },
  {
    meta: {
      keepAlive: true,
      requireAuth: true,
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/updateLogs',
    name: 'updateLogs',
    component: () => import('@/view/configCenter/UpdateLogs.vue'),
  },
];

export default commonRouter;
