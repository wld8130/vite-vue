import type { RouteRecordRaw } from 'vue-router';
import { routersApi } from '/@/api/user';
import { messageWithKey } from '/@/hooks/useMessageKey';
import useUserStore from '/@/store/modules/user';
import Storage from '/@/utils/Storage';
import { STORAGE_TOKEN } from '/@/utils/consts';
// import { routes } from '/@/router';
import { routerPermissions } from '/@/utils/routeConfig';

export const useRouterList = () => {
  const userStore = useUserStore();

  const getRouterList = () => {
    return new Promise((resolve, reject) => {
      routersApi()
        .then(({ code, data, msg }) => {
          if (code !== 200) {
            messageWithKey.error(msg);
            Storage.removeCookie(STORAGE_TOKEN);
            userStore.resetUserInfo();
            reject();
          } else {
            resolve({ routerList: data });
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  // 产生重定向
  const createRedirect = (path: string, children: RouteRecordRaw[]) => {
    const childPath = children[0]?.path || '';
    return `${path}/${childPath}`;
  };

  const isEffective = (menuInfos: any[]) => {
    let flag = 0;
    menuInfos.forEach((k) => {
      if (k.meta?.hidden) {
        flag += 1;
      }
    });
    return flag === menuInfos.length;
  };

  const createMenuRouters = (routesOfMenus: any[]): RouteRecordRaw[] => {
    const routerList: any = [];
    routesOfMenus.forEach((k: any) => {
      const routeName = parRoute && parRoute.name ? `${parRoute?.name}/${k.name}` : k.name;
      if (k.children && k.children.length > 0) {
        if (!isEffective(k.children)) {
          routerList.push({
            ...k,
            name: routeName,
            component: BasicRouter,
            redirect: createRedirect(k.path, k.children || []),
            children: createChildPowerRoutes(k.children || [], {
              ...k,
              name: routeName,
            }),
          });
        }
      } else {
        routerList.push({
          ...k,
          // component: () => import(`../views/${k.component}`),
          component: routerPermissions[k.component],
        });
      }
    });
    return routerList;
  };

  return {
    getRouterList,
    createMenuRouters,
  };
};
