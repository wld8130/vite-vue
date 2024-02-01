<template>
  <div class="home-container">
    <FabricEditor />
  </div>
</template>

<script setup lang="ts">
  import FabricEditor from '/@/components/FabricEditor/index.vue';
</script>

<style lang="less">
  .home-container {
    width: 100%;
    height: 100%;
    padding: 12px 12px 0;
    border-radius: 8px;
    background-color: #fff;
  }
</style>
