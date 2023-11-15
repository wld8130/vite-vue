<template>
  <div class="main-layout">
    <div class="main-header">
      <DefaultHeader />
    </div>
    <div class="main-container">
      <div class="main-slider">
        <DefaultSlider />
      </div>
      <div class="main-content">
        <RouterView />
      </div>
    </div>
    <SystemDrawer />
  </div>
</template>

<script lang="ts" setup name="Layout">
import SystemDrawer from '/@/layouts/config/SystemDrawer.vue';
import DefaultHeader from './default/DefaultHeader.vue';
import DefaultSlider from './default/DefaultSlider.vue';
</script>

<style lang="less">
@main: main;
@header-height: 64px;
@slider-width: 272px;

.@{main}-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .@{main}-header {
    width: 100%;
    height: @header-height;
    box-shadow: rgb(0 0 0 / 16%)	0 1px	2px	-2px,
    rgb(0 0 0 / 12%)	0 3px	6px	0,
    rgb(0 0 0 / 9%)	0 5px	12px	4px;
  }

  .@{main}-container {
    display: flex;
    width: 100%;
    height: calc(100vh - @header-height);

    .@{main}-slider {
      width: @slider-width;
      height: 100%;
      overflow-y: auto;
    }

    .@{main}-content {
      width: calc(100vw - @slider-width);
      height: 100%;
      padding: 24px;
      background: #f8f9fc;
    }
  }


}
</style>