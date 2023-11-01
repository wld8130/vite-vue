<template>
  <div class="default-header">
    <div class="default-header-logo">
      <img :src="LOGO" alt="logo" srcset="" class="default-header-logo-img" />
    </div>
    <div class="default-header-center">
      <Button type="primary" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="appStore.collapsed" />
        <MenuFoldOutlined v-else />
      </Button>
    </div>
    <div class="default-header-right">2</div>
  </div>
</template>

<script setup lang="ts" name="DefaultHeader">
import { Button } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import useAppStore from '/@/store/modules/app';
import LOGO from '/@/assets/img/login-logo.png';

const appStore = useAppStore();

const toggleCollapsed = appStore.toggleCollapsed;
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