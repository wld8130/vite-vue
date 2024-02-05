<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="ruoteKey(route)" />
    </keep-alive>
    <!-- <component v-if="$route.meta.noCache" :is="Component" /> -->
  </router-view>
</template>

<script lang="ts" setup name="BasicRouter">
  // import { useRoute } from 'vue-router';
  // const route = useRoute();
  const ruoteKey = (route) => {
    if (!route.meta.noCache) {
      return route.path;
    }
    return `${route.path}${Date.now()}`;
  };
</script>
