import type { Router, RouteRecordRaw } from 'vue-router';
import Storage from '/@/utils/Storage';
import useUserStore from '/@/store/modules/user';
import useRouteStore from '/@/store/modules/route';
import { STORAGE_TOKEN } from '/@/utils/consts';
import { useUserInfo } from '/@/hooks/useUserInfo';
import { useRouterList } from '/@/hooks/useRouterList';
import { isEmpty } from '/@/utils/common';
import { WHITE_ROUTER_LIST } from '/@/utils/consts';

// 路由白名单
const whiteList = WHITE_ROUTER_LIST;

export const routerWithPermissions = (router: Router) => {
  // 路由导航守卫
  router.beforeEach(async (to) => {
    const userStore = useUserStore();
    const routeStore = useRouteStore();
    const { getUserInfo } = useUserInfo();
    const { getRouterList, createMenuRouters } = useRouterList();

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
            // 当为空数组时是否认定为无权限角色
            return { path: '/login' };
          } else {
            // 获取路由信息
            const { routerList = [] } = await getRouterList();
            if (isEmpty(routerList)) {
              // 没有获取到路由表（1.请求无响应；2.请求异常）
              // 清除token，清除用户信息
              userStore.resetUserInfo();
              Storage.removeCookie(STORAGE_TOKEN);
              return { path: '/login' };
            } else {
              // 需要对路由进行处理
              const newList = createMenuRouters(routerList);
              // 更新store的menus
              const routeApiList = routeStore.updateRoutes(newList);
              // 将添加的路由表注册进路由(需要将路由信息全部重新加载)
              routeApiList.forEach((route: any) => {
                router.addRoute(route);
              });
              // 判断权限路由是否包含当前路由
              const item = router.getRoutes().find((k: RouteRecordRaw) => k.path === to.fullPath.split('?')[0]);
              if (item) {
                return true;
              } else {
                return { path: '/' };
              }
            }
          }
        } else {
          // 存在用户信息，正常跳转
          return true;
        }
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

 
