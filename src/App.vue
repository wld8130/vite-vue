<script setup lang="ts">
// import { ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import useAppStore from '/@/store/modules/app';
dayjs.locale('zh-cn');
const locale = zhCN;
const appStore = useAppStore();
</script>

<template>
  <AConfigProvider
    :theme="{
      token: {
        colorPrimary: appStore.themeColor,
      },
    }"
    :locale="locale"
  >
    <!-- <App> -->
    <RouterView />
    <!-- </App> -->
  </AConfigProvider>
</template>
