<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup name="SvgIcon">
  import { computed } from 'vue';

  const props = defineProps({
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  });

  const iconName = computed(() => `#icon-${props.iconClass}`)
  const svgClass = computed(() => `svg-icon ${props.className}`)
</script>

<style lang="less" scoped>
  .svg-icon {
    position: relative;
    width: 16px;
    height: 16px;
    overflow: hidden;
    fill: currentcolor;
    vertical-align: -0.2em;
    // color: rgba(89,89,89,1);

    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      inset: 0;
      cursor: pointer;
      pointer-events: none;
    }
  }
</style>
