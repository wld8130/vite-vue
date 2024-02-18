import { RouteRecordRaw } from 'vue-router';
// import Home from '/@/views/Home/index.vue';
import PersonCenter from '/@/views/PersonCenter/index.vue';

export const constRoutes: RouteRecordRaw[] = [
  // {
  //   path: 'home',
  //   name: 'home',
  //   component: Home,
  //   meta: {
  //     title: '首页',
  //     icon: 'user',
  //   },
  // },
];

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: 'person-center',
    name: 'personCenter',
    component: PersonCenter,
    meta: {
      title: '个人中心',
      hidden: true,
    },
  },
];
