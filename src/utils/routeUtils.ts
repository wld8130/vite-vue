import NoRouter from '/@/views/NoRouter/index.vue';
import Home from '/@/views/Home/index.vue';
import { markRaw } from 'vue';

export const routerPermissions = {
  home: Home,
  'DataStatistics/QuotaData': markRaw(Home),
};

export const mateRouteComponent = (routeKey: string, componentObj: any) => {
  return componentObj[routeKey] || markRaw(NoRouter);
};
