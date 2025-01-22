import { AppRouteRecordRaw } from '@/router';

const noteLibraryRouter: AppRouteRecordRaw = [
  {
    meta: {
      title: '笔记库',
      keepAlive: true,
      requireAuth: true,
    },
    path: '/noteLibrary',
    name: 'noteLibrary',
    component: () => import('@/view/noteLibrary/NoteLibrary.vue'),
  },
  {
    path: '/noteLibrary/:value(.*)',
    name: 'NoteDetail',
    component: () => import('@/view/noteLibrary/components/NoteDetail.vue'),
  },
];

export default noteLibraryRouter;
