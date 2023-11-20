<template>
  <div class="main-layout">
    <div class="main-header" :style="{ height: systemCss.HEADER_HEIGHT }">
      <DefaultHeader />
    </div>
    <div class="main-container" :style="{ height: `calc(100vh - ${systemCss.HEADER_HEIGHT})` }">
      <DefaultSlider class="main-slider" :style="{ width: sliderWidth }" />
      <div class="main-content" :style="{ width: `calc(100vw - ${sliderWidth})` }">
        <RouterView />
      </div>
    </div>
    <SystemDrawer />
  </div>
</template>

<script lang="ts" setup name="Layout">
import { computed } from 'vue';
import SystemDrawer from '/@/layouts/config/SystemDrawer.vue';
import DefaultHeader from './default/DefaultHeader.vue';
import DefaultSlider from './default/DefaultSlider.vue';
import { systemCss } from '/@/utils/config';
import useAppStore from '/@/store/modules/app';

const appStore = useAppStore();

const sliderWidth = computed(() => appStore.collapsed ? systemCss.SLIDER_WIDTH_COLLAPSED : systemCss.SLIDER_WIDTH)
</script>

<style lang="less">
@main: main;
// @header-height: 64px;
// @slider-width: 272px;

.@{main}-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .@{main}-header {
    width: 100%;
    // height: @header-height;
    box-shadow: rgb(0 0 0 / 16%)	0 1px	2px	-2px,
    rgb(0 0 0 / 12%)	0 3px	6px	0,
    rgb(0 0 0 / 9%)	0 5px	12px	4px;
  }

  .@{main}-container {
    display: flex;
    width: 100%;
    // height: calc(100vh - @header-height);

    .@{main}-slider {
      // width: @slider-width;
      height: 100%;
      overflow-y: auto;
    }

    .@{main}-content {
      // width: calc(100vw - @slider-width);
      height: 100%;
      padding: 24px;
      transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
      background: #f8f9fc;
    }
  }

}
</style>