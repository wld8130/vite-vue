<template>
  <div class="default-header">
    <div class="default-header-logo">
      <img :src="systemCss.LOGO_OF_WORD" alt="logo" srcset="" class="default-header-logo-img" />
    </div>
    <div class="default-header-center">
      <Button type="primary" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="appStore.collapsed" />
        <MenuFoldOutlined v-else />
      </Button>
    </div>
    <div class="default-header-right">
      <Space :size="16">
        <Button size="small" @click="handleToggleLocale">{{ locale }}</Button>
        <Dropdown placement="bottomRight">
          <Icon style="width: 24px;height: 24px;">
            <template #component>
              <svg width="auto" height="auto" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="44" cy="44" r="44" fill="#F0F5FF" />
                <circle cx="15" cy="15" r="15" transform="matrix(1 0 0 -1 29 49)" fill="#ADC6FF" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.791 72.3598C18.8038 61.8263 30.0663 54 43.4996 54C57.2582 54 68.7397 62.2101 71.4124 73.1298C64.2529 79.8699 54.6086 84 43.9996 84C32.9924 84 23.0235 79.554 15.791 72.3598Z"
                  fill="#ADC6FF"
                />
              </svg>
            </template>
          </Icon>
          <template #overlay>
            <Menu>
              <MenuItem>个人中心</MenuItem>
              <MenuItem>退出</MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </Space>
    </div>
  </div>
</template>

<script setup lang="ts" name="DefaultHeader">
import { computed } from 'vue';
import { Button, Dropdown, Menu, MenuItem, Space } from 'ant-design-vue';
import Icon, { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import useAppStore from '/@/store/modules/app';
import { systemCss } from '/@/utils/config';

const appStore = useAppStore();

const toggleCollapsed = appStore.toggleCollapsed;

const locale = computed(() => appStore.locale === 'zh' ? '中文' : 'English');

const handleToggleLocale = () => {
  appStore.toggleLocale();
};
</script>

<style lang="less">
@default-header: default-header;

.@{default-header} {
  display: flex;
  width: 100%;
  height: 100%;

  &-logo {
    display: flex;
    align-items: center;
    width: 272px;

    &-img {
      height: 40px;
      padding-left: 54px;
    }
  }

  &-center {
    display: flex;
    flex: 1;
    align-items: center;
  }

  &-right {
    display: flex;
    align-items: center;
    padding-right: 12px;
  }
}
</style>