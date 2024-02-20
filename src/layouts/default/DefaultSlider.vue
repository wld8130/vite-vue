<template>
  <div class="default-slider">
    <Menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inlineCollapsed="appStore.collapsed"
      @click="handleClick"
      class="default-slider-menu"
    >
      <template v-for="menu in menus" :key="menu.name">
        <template v-if="!menu.meta?.hidden">
          <SubMenu v-if="menu.children && menu.children.length > 0" :key="menu.name">
            <template #icon v-if="menu.meta?.icon">
              <SvgIcon :iconClass="(menu.meta?.icon as string)" :class="appStore.collapsed ? '' : 'margin-left-48'" />
            </template>
            <template #title>
              <span :class="menu.meta?.icon ? '' : 'margin-left-48'">{{ menu.meta?.title }}</span>
            </template>
            <template v-for="item in menu.children" :key="item.name">
              <template v-if="!item.meta?.hidden">
                <MenuItem :key="item.name">
                  <span :class="appStore.collapsed ? '' : 'margin-left-48'">{{ item.meta?.title }}</span>
                </MenuItem>
              </template>
            </template>
          </SubMenu>
          <template v-else>
            <MenuItem :key="menu.name">
              <template #icon v-if="menu.meta?.icon">
                <SvgIcon :iconClass="(menu.meta?.icon as string)" :class="appStore.collapsed ? '' : 'margin-left-48'" />
              </template>
              <span :class="menu.meta?.icon ? '' : 'margin-left-48'">{{ menu.meta?.title }}</span>
            </MenuItem>
          </template>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
  import { Menu, MenuItem, SubMenu } from 'ant-design-vue';
  import { ref, computed, watch } from 'vue';
  import type { MenuProps } from 'ant-design-vue';
  import useAppStore from '/@/store/modules/app';
  import useRouteStore from '/@/store/modules/route';
  import { MENU_ROUTER_NAME } from '/@/utils/consts';
  import { useRoute, useRouter } from 'vue-router';
  import SvgIcon from '/@/components/SvgIcon/svg-icon.vue';

  const appStore = useAppStore();

  const routeStore = useRouteStore();

  const route = useRoute();

  const router = useRouter();

  // 获取当前打开的子菜单
  const getOpenKeys = (): string[] => [route.matched[1]?.name] as string[];

  const getSelectedKeys = () => {
    const routrName = route.name as string;
    return [routrName.replace('/details', '')]
  };

  const openKeys = ref<string[]>(getOpenKeys());

  const selectedKeys = ref<string[]>(getSelectedKeys());

  // 需要动态变化
  const menus = computed(() => routeStore.routes.find((item) => item.name === MENU_ROUTER_NAME)?.children || []);

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    router.push({ name: key as string });
  };

  // 监听菜单收缩
  watch(
    () => appStore.collapsed,
    (newVal) => {
      openKeys.value = newVal ? [] : getOpenKeys();
      selectedKeys.value = getSelectedKeys();
    },
  );

  // 监听路由变化
  watch(route, () => {
    openKeys.value = getOpenKeys();
    selectedKeys.value = getSelectedKeys();
  });
</script>

<style lang="less">
  .default-slider {
    // width: 100%;
    .default-slider-menu {
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
  }
</style>