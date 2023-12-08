import type { Router } from 'vue-router';
import Storage from '/@/utils/Storage';
import useUserStore from '/@/store/modules/user';
import { STORAGE_TOKEN } from '/@/utils/consts';
import { useUserInfo } from '/@/hooks/useUserInfo';
import { useRouterList } from '/@/hooks/useRouterList';
import { isEmpty } from '/@/utils/common';

const whiteList = ['/login', '/thirdLogin', '/unitelogin'];

export const routerWithPermissions = (router: Router) => {
  // 路由导航守卫
  router.beforeEach(async (to) => {
    const userStore = useUserStore();
    const { getUserInfo } = useUserInfo();
    const { getRouterList } = useRouterList();

    // 判断 token 是否存在
    if (Storage.getCookie(STORAGE_TOKEN)) {
      // 判断路径是否为 '/login'
      if (to.path === '/login') {
        // 因存在 token 直接跳转至 '/'
        return { path: '/' }; // 不跳转
      } else {
        // 判断用户信息是否存在
        if (userStore.roles.length === 0) {
          // 获取用户信息
          const userResult = await getUserInfo();
          if (isEmpty(userResult)) {
            // 获取用户信息失败,返回登录页（已清除token，清除用户信息）
            return { path: '/login' };
          } else {
            // 获取路由信息
            const routerResult = await getRouterList();
            if (isEmpty(routerResult)) {
              // 没有获取到路由表（1.请求无响应；2.请求异常）
              // 清除token，清除用户信息
              return { path: '/login' };
            } else {
              console.log(routerResult);
              // 手动添加路由
              return true;
            }
          }
        } else {
          // 存在用户信息，正常跳转
          return true;
        }
        // return true;
        // 判断是否有用户信息
        // if (userStore.roles?.length === 0) {
        //   // 获取用户个人信息
        //   store.dispatch('user/getInfo').then(() => {
        //     store
        //       .dispatch('routes/generateRoutes')
        //       .then((accessRoutes: RouteRecordRaw[]) => {
        //         // 将添加的路由表注册进路由
        //         accessRoutes.forEach((route) => {
        //           router.addRoute(route);
        //         });
        //         // 判断权限路由是否包含当前路由
        //         const item = router.getRoutes().find((k: RouteRecordRaw) => k.path === to.fullPath.split('?')[0]);
        //         if (item) {
        //           next(to.fullPath);
        //         } else {
        //           // 无对应路由跳转至 首页
        //           next('/');
        //         }
        //       })
        //       .catch(() => {
        //         setTimeout(() => {
        //           store.dispatch('user/logout');
        //         }, 1000);
        //       });
        //   });
        // } else {
        //   next();
        // }
      }
    } else {
      // 在免登录白名单，直接进入 配置 (whiteList)
      // 不需要 token 的
      console.log(to);
      if (whiteList.indexOf(to.path) !== -1) {
        return true;
      } else {
        // 携带上 当前的路径 并于登陆后返回
        return { path: '/login' };
        // next(`/login?redirect=${to.fullPath}`);
      }
    }
  });
};

 
