<template>
  <div>
    <div>Header</div>
    <div>Slider</div>
    <div>
      Content
      <RouterView />
      <a-button type="primary">111</a-button>
    </div>
    <SystemDrawer />
  </div>
</template>

<script lang="ts" setup name="Layout">
import SystemDrawer from '/@/layouts/config/SystemDrawer.vue';
</script>
