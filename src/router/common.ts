import { RouteRecordRaw } from 'vue-router';
import Login from '/@/views/Login/index.vue';
import NotFound from '/@/views/NotFound/index.vue';

export const commonRouters: RouteRecordRaw[] = [
  { path: '/login', component: Login },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
