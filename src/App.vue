<script setup lang="ts">
import { computed } from 'vue';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import useAppStore from '/@/store/modules/app';
import BasicRouteView from '/@/components/RouteContainer/BasicRouteView.vue';
const appStore = useAppStore();
dayjs.locale('zh-cn');
const locale = computed(() => appStore.locale === 'zh' ? zhCN : enUS);
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
    <BasicRouteView />
  </AConfigProvider>
</template>
