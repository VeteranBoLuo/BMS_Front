import { AppRouteRecordRaw } from '@/router';

const manageRouter: AppRouteRecordRaw = {
  meta: {
    title: '数据管理',
    keepAlive: true,
    requireAuth: true,
  },
  path: '/manage',
  name: 'manage',
  children: [
    {
      path: 'editTag',
      name: 'editTag',
      component: () => import('@/view/manage/components/TagTable.vue'),
    },
    {
      path: 'editTag/:id',
      component: () => import('@/view/manage/components/EditTag.vue'),
    },
    {
      path: 'editBookmark',
      name: 'editBookmark',
      component: () => import('@/view/manage/components/BookmarkTable.vue'),
    },
    {
      path: 'editBookmark/:id',
      component: () => import('@/view/manage/components/EditBookmark.vue'),
    },
    {
      path: 'editBookmark/add/:tagId', // 新增时，自动关联tag
      component: () => import('@/view/manage/components/EditBookmark.vue'),
    },
  ],
};

export default manageRouter;
