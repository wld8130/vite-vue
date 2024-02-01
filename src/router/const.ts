import { RouteRecordRaw } from 'vue-router';
import Home from '/@/views/Home/index.vue';

export const constRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      icon: 'user',
    },
  },
];
