import { AppRouteRecordRaw } from '@/router';

const adminRouter: AppRouteRecordRaw[] = [
  {
    meta: {
      title: '后台管理',
      keepAlive: true,
      requireAuth: true,
    },
    path: '/admin',
    name: 'admin',
    component: () => import('@/view/admin/AdminMg.vue'),
    redirect: '/admin/operationLog',
    children: [
      {
        path: 'apiLog',
        component: () => import('@/view/admin/components/desktop/ApiLog.vue'),
      },
      {
        path: 'operationLog',
        component: () => import('@/view/admin/components/desktop/OperationLog.vue'),
      },
      {
        path: 'userMg',
        component: () => import('@/view/admin/components/desktop/UserMg.vue'),
      },
    ],
  },
  {
    path: 'apiLog',
    component: () => import('@/view/admin/components/phone/PApiLog.vue'),
  },
  {
    path: 'operationLog',
    component: () => import('@/view/admin/components/phone/POperationLog.vue'),
  },
  {
    path: 'userMg',
    component: () => import('@/view/admin/components/phone/PUserMg.vue'),
  },
];

export default adminRouter;
