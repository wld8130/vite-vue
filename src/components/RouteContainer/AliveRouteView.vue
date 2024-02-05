<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade">
      <KeepAlive>
        <Component :is="Component" :key="ruoteKey(route)" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script lang="ts" setup name="AliveRouteView">
  // import { useRoute } from 'vue-router';
  // const route = useRoute();
  const ruoteKey = (route: any) => {
    if (!route.meta.noCache) {
      return route.path;
    }
    return `${route.path}${Date.now()}`;
  };
</script>
