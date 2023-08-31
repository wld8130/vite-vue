<script setup lang="ts">
import { ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const locale = zhCN;
const colorPrimary = ref('#00b96b');
</script>

<template>
  <AConfigProvider
    :theme="{
      token: {
        colorPrimary,
      },
    }"
    :locale="locale"
  >
    <!-- <App> -->
    <RouterView />
    <!-- </App> -->
  </AConfigProvider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  user-select: none;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
