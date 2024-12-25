import { AppRouteRecordRaw } from '@/router';

const helpRouter: AppRouteRecordRaw = {
  meta: {
    title: '帮助文档',
    keepAlive: true,
    requireAuth: true,
  },
  path: '/help',
  name: 'help',
  component: () => import('@/view/configCenter/HelpMg.vue'),
};

export default helpRouter;
