import { AppRouteRecordRaw } from '@/router';

const noteLibraryRouter: AppRouteRecordRaw[] = [
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
];

export default noteLibraryRouter;
