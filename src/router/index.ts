import { createRouter, createWebHashHistory, RouteMeta, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';

import loginRouter from '@/router/modules/login';
import mainPageRouter from '@/router/modules/mainPage';
import statusRouter from '@/router/modules/status';
import helpRouter from '@/router/modules/help';
import adminRouter from '@/router/modules/admin';
import manageRouter from '@/router/modules/manage.ts';
import phoneRouter from '@/router/modules/phone.ts';
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
    children: [mainPageRouter, manageRouter, helpRouter, adminRouter, manageRouter],
  },
  {
    path: '/personCenter',
    name: 'personCenter',
    component: () => import('@/view/configCenter/PersonCenter.vue'),
  },
  phoneRouter, //手机端路由
  loginRouter,
  statusRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
