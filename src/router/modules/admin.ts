import { AppRouteRecordRaw } from '@/router';

const adminRouter: AppRouteRecordRaw = {
  meta: {
    title: '后台管理',
    keepAlive: true,
    requireAuth: true,
  },
  path: '/admin',
  name: 'admin',
  component: () => import('@/view/admin/Admin.vue'),
  redirect: '/admin/operationLog',
  children: [
    {
      path: 'apiLog',
      component: () => import('@/view/admin/components/ApiLog.vue'),
    },
    {
      path: 'operationLog',
      component: () => import('@/view/admin/components/OperationLog.vue'),
    },
    {
      path: 'userMg',
      component: () => import('@/view/admin/components/UserMg.vue'),
    },
  ],
};

export default adminRouter;
