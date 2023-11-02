import { createRouter, createWebHistory } from 'vue-router';
import LayOuts from '/@/layouts/index.vue';
// import Home from '/@/views/Home/index.vue';
import About from '/@/views/About/index.vue';
import NotFound from '/@/views/NotFound/index.vue';

const routes = [
  { path: '/', component: LayOuts },
  { path: '/about', component: About },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
  // /About  /about  -->  /about  不区分大小写
  strict: true,
});

export default router;
