import NoRouter from '/@/views/NoRouter/index.vue';
import Home from '/@/views/Home/index.vue';

export const routerPermissions = {
  home: Home,
};

export const mateRouteComponent = (routeKey: string, componentObj: any) => {
  return componentObj[routeKey] || NoRouter;
};
