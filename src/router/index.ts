import { createRouter, createWebHashHistory, RouteMeta, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';

import loginRouter from '@/router/modules/login';
import mainPageRouter from '@/router/modules/mainPage';
import statusRouter from '@/router/modules/status';
import helpRouter from '@/router/modules/help';
import adminRouter from '@/router/modules/admin';
import manageRouter from '@/router/modules/manage.ts';
import commonRouter from '@/router/modules/common.ts';
import noteLibraryRouter from '@/router/modules/noteLibrary.ts';
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
    path: '/',
    name: '/',
    redirect: '/home',
    component: () => import('@/view/index.vue'),
    children: [mainPageRouter, helpRouter, ...adminRouter, manageRouter, ...noteLibraryRouter],
  },
  {
    path: '/personCenter',
    name: 'personCenter',
    component: () => import('@/view/configCenter/components/phone/PPersonCenter.vue'),
  },
  {
    path: '/noteLibrary/:value(.*)',
    name: 'NoteDetail',
    component: () => import('@/view/noteLibrary/components/NoteDetail.vue'),
  },
  ...commonRouter,
  loginRouter,
  statusRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
