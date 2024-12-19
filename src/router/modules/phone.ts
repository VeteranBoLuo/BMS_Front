import { AppRouteRecordRaw } from '@/router';

const configCenterRouter: AppRouteRecordRaw = {
  meta: {
    title: '数据管理',
    keepAlive: true,
    requireAuth: true,
  },
  path: '/phone',
  name: 'phone',
  children: [
    {
      path: 'editTag',
      component: () => import('@/view/manage/components/phone/PTagTable.vue'),
    },
    {
      path: 'editTag/:id',
      component: () => import('@/view/phone/manage/EditTag.vue'),
    },
    {
      path: 'editBookmark',
      component: () => import('@/view/manage/components/phone/PBookmarkTable.vue'),
    },
    {
      path: 'editBookmark/:id',
      component: () => import('@/view/phone/manage/EditBookmark.vue'),
    },
    {
      path: 'editBookmark/add/:tagId', // 新增时，自动关联tag
      component: () => import('@/view/phone/manage/EditBookmark.vue'),
    },
    {
      path: 'help', // 新增时，自动关联tag
      component: () => import('@/view/phone/help/Help.vue'),
    },
  ],
};

export default configCenterRouter;
