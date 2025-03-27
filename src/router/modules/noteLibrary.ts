import { AppRouteRecordRaw } from '@/router';
import { RoleEnum } from '@/config/bookmarkCfg.ts';

const noteLibraryRouter: AppRouteRecordRaw[] = [
  {
    meta: {
      title: '笔记库',
      keepAlive: true,
      requireAuth: true,
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/noteLibrary',
    name: 'noteLibrary',
    component: () => import('@/view/noteLibrary/NoteLibrary.vue'),
  },
];

export default noteLibraryRouter;
