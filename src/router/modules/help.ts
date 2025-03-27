import { AppRouteRecordRaw } from '@/router';
import { RoleEnum } from '@/config/bookmarkCfg.ts';

const helpRouter: AppRouteRecordRaw = {
  meta: {
    title: '帮助文档',
    keepAlive: true,
    requireAuth: true,
    roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
  },
  path: '/help',
  name: 'help',
  component: () => import('@/view/configCenter/HelpMg.vue'),
};

export default helpRouter;
