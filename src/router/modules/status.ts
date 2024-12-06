import { AppRouteRecordRaw } from '@/router';

const statusRouter: AppRouteRecordRaw = {
  path: '/:catchAll(.*)',
  name: 'not-found',
  component: () => import('@/components/PageResponse/404.vue'),
};

export default statusRouter;
