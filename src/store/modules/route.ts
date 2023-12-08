import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const useRouteStore = defineStore('route', () => {
  const routes = ref<RouteRecordRaw[]>([]);

  return {
    routes,
  };
});

export default useRouteStore;
