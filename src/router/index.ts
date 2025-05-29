import { createRouter, createWebHashHistory, RouteMeta, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';

import loginRouter from '@/router/modules/login';
import mainPageRouter from '@/router/modules/mainPage';
import statusRouter from '@/router/modules/status';
import commonRouter from '@/router/modules/common';
import adminRouter from '@/router/modules/admin';
import manageRouter from '@/router/modules/manage.ts';
import phoneRouter from '@/router/modules/phone';
import noteLibraryRouter from '@/router/modules/noteLibrary.ts';
import { RoleEnum } from '@/config/bookmarkCfg.ts';
export interface AppRouteRecordRaw {
  name?: string;
  meta?: RouteMeta;
  path?: string;
  component?: Component | string;
  components?: Component;
  redirect?: string;
  children?: AppRouteRecordRaw[];
}

const routes: Array<RouteRecordRaw | any> = [
  {
    meta: {
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/',
    name: '/',
    redirect: '/home',
    component: () => import('@/view/index.vue'),
    children: [mainPageRouter, ...commonRouter, ...adminRouter, manageRouter, ...noteLibraryRouter],
  },
  {
    meta: {
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/personCenter',
    name: 'personCenter',
    component: () => import('@/view/configCenter/components/phone/PPersonCenter.vue'),
  },
  {
    meta: {
      roles: [RoleEnum.Root, RoleEnum.ADMIN, RoleEnum.VISITOR],
    },
    path: '/noteLibrary/:id(.*)',
    name: 'NoteDetail',
    component: () => import('@/view/noteLibrary/NoteDetail.vue'),
  },
  loginRouter,
  ...statusRouter,
  ...phoneRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
