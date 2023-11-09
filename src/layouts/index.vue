<template>
  <div class="main-layout">
    <div class="main-header">
      <DefaultHeader />
    </div>
    <div>Slider</div>
    <div>
      Content
      <RouterView />
      <CodeEditor />
    </div>
    <SystemDrawer />
  </div>
</template>

<script lang="ts" setup name="Layout">
import SystemDrawer from '/@/layouts/config/SystemDrawer.vue';
import DefaultHeader from './default/DefaultHeader.vue';
import CodeEditor from '/@/components/CodeEditor/index.vue';
</script>

<style lang="less">
@main: main;

.@{main}-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .@{main}-header {
    width: 100%;
    height: 64px;
    box-shadow: 0 2px 8px 0 rgb(205 209 224 / 15%);
  }
}
</style>
