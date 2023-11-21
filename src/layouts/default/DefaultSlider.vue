<template>
  <Menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inlineCollapsed="appStore.collapsed"
    @click="handleClick"
    class="default-slider"
  >
    <SubMenu key="sub1">
      <template #icon>
        <SettingOutlined :class="appStore.collapsed ? '' : 'margin-left-48'" />
      </template>
      <template #title>数据统计</template>
      <MenuItem key="5">
        <span :class="appStore.collapsed ? '' : 'margin-left-48'">Option 5</span>
      </MenuItem>
      <MenuItem key="6">
        <span :class="appStore.collapsed ? '' : 'margin-left-48'">Option 6</span>
      </MenuItem>
      <MenuItem key="7">
        <span :class="appStore.collapsed ? '' : 'margin-left-48'">Option 7</span>
      </MenuItem>
      <MenuItem key="8">
        <span :class="appStore.collapsed ? '' : 'margin-left-48'">Option 8</span>
      </MenuItem>
    </SubMenu>
    <MenuItem key="9">
      <template #icon>
        <SettingOutlined :class="appStore.collapsed ? '' : 'margin-left-48'" />
      </template>
      <span>Option 9</span>
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
  import { Menu, MenuItem, SubMenu } from 'ant-design-vue';
  import { ref } from 'vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import type { MenuProps } from 'ant-design-vue';
  import useAppStore from '/@/store/modules/app';

  const openKeys = ref<string[]>([]);

  const selectedKeys = ref<string[]>();

  const appStore = useAppStore();

  const handleClick: MenuProps['onClick'] = e => {
    console.log('click', e);
  };
</script>

<style lang="less">
  .default-slider {
    // width: 100%;
    height: 100%;
    padding: 12px;
  }

  .ant-menu-light.ant-menu-root.ant-menu-inline {
    border: none;
  }

  .ant-menu-light.ant-menu-root.ant-menu-vertical {
    border: none;
  }

  .ant-menu-inline >.ant-menu-submenu>.ant-menu-submenu-title {
    height: 50px;
    line-height: 50px;
  }

  .ant-menu-inline .ant-menu-item {
    height: 50px;
    line-height: 50px;
  }

  .ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
    background-color: transparent;
  }

  .ant-menu-inline .ant-menu-item::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 8px;
    width: 4px;
    height: 34px;
    transform: scaleY(.0001);
    transition: transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);
    border-radius: 8px;
    opacity: 0;
    background-color: #2f54eb;
  }

  .ant-menu-inline .ant-menu-item-selected::before {
    transform: scaleY(1);
    transition: transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);
    opacity: 1;
  }

  .ant-menu-inline .ant-menu-submenu-arrow::before {
    transform: rotate(135deg) translateX(2.5px);
  }

  .ant-menu .ant-menu-submenu-open.ant-menu-submenu-inline>.ant-menu-submenu-title>.ant-menu-submenu-arrow::before {
    transform: rotate(-45deg) translateX(2.5px);
  }

  .ant-menu .ant-menu-submenu-open.ant-menu-submenu-inline>.ant-menu-submenu-title>.ant-menu-submenu-arrow::after {
    transform: rotate(45deg) translateX(-2.5px);
  }

  .ant-menu .ant-menu-submenu-open.ant-menu-submenu-inline>.ant-menu-submenu-title>.ant-menu-submenu-arrow {
    transform: none;
  }
</style>