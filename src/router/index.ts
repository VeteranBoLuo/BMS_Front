import { createRouter, createWebHashHistory, RouteMeta, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';

import loginRouter from '@/router/modules/login';
import manageRouter from '@/router/modules/manage';
import mainPageRouter from '@/router/modules/mainPage';
import statusRouter from '@/router/modules/status';
import userCenterRouter from '@/router/modules/userCenter';
import helpRouter from '@/router/modules/help';
import adminRouter from '@/router/modules/admin';
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
    children: [mainPageRouter, manageRouter, userCenterRouter, helpRouter, adminRouter],
  },
  loginRouter,
  statusRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
