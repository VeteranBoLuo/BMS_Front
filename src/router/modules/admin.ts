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
      {
        path: 'userOpinion',
        component: () => import('@/view/admin/components/desktop/UserOpinion.vue'),
      },
      {
        path: 'imageMg',
        component: () => import('@/view/admin/components/desktop/ImageMg.vue'),
      },
      {
        path: 'simpleSql',
        component: () => import('@/view/admin/SimpleSql.vue'),
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
  {
    path: 'userOpinion',
    component: () => import('@/view/admin/components/phone/PUserOpinion.vue'),
  },
  {
    path: 'imageMg',
    component: () => import('@/view/admin/components/phone/PImageMg.vue'),
  },
];

export default adminRouter;
