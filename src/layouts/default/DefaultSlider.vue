<template>
  <Menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :items="items"
    :inlineCollapsed="appStore.collapsed"
    @click="handleClick"
    class="default-slider"
  />
</template>

<script setup lang="ts">
import { Menu } from 'ant-design-vue';
import { reactive, ref, VueElement, h } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
import useAppStore from '/@/store/modules/app';

const openKeys = ref<string[]>([]);

const selectedKeys = ref<string[]>();

const appStore = useAppStore();

const getItem = (
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType =>  {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem('dashboard', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
    getItem('Option 9', '91'),
    getItem('Option 10', '101'),
    getItem('Option 11', '111'),
    getItem('Option 12', '121'),
    getItem('Option 9', '911'),
    getItem('Option 10', '1011'),
    getItem('Option 11', '1111'),
    getItem('Option 12', '1211'),
    getItem('Option 9', '9111'),
    getItem('Option 10', '10111'),
    getItem('Option 11', '11111'),
    getItem('Option 12', '12111'),
    getItem('Option 9', '91111'),
    getItem('Option 10', '101111'),
    getItem('Option 11', '111111'),
    getItem('Option 12', '121111'),
  ]),
]);

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

:where(.css-dev-only-do-not-override-15ssfrr).ant-menu-light.ant-menu-root.ant-menu-inline {
  border: none;
}

:where(.css-dev-only-do-not-override-15ssfrr).ant-menu-light.ant-menu-root.ant-menu-vertical {
  border: none;
}
</style>