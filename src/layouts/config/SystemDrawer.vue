<template>
  <FloatButton
    type="primary"
    shape="square"
    :style="{
      right: '-4px',
    }"
    @click="handleShowModal"
  >
    <template #icon>
      <SettingOutlined v-if="!open" />
    </template>
  </FloatButton>
  <Drawer v-model:open="open" placement="right" @after-open-change="afterOpenChange">
    <template #extra>
      <a-button type="primary" @click="onSure">确定</a-button>
    </template>
    <Form layout="vertical">
      <FormItem label="主题色">
        <Input type="color" class="width-128" v-model:value="formData.themeColor" />
      </FormItem>
      <Divider />
    </Form>
  </Drawer>
</template>

<script lang="ts" setup name="SystemDrawer">
import { ref, reactive, UnwrapRef } from 'vue';
import {
  SettingOutlined,
} from '@ant-design/icons-vue';
import { FloatButton, Drawer, Input, Divider, Form, FormItem } from "ant-design-vue";
import useAppStore from '/@/store/modules/app';
import { isEqual } from '/@/utils/common';

const appStore = useAppStore();
const open = ref<boolean>(false);

interface FormState {
  themeColor: string
}

const formData: UnwrapRef<FormState> = reactive({
  themeColor: appStore.themeColor
})

const handleShowModal = () => {
  open.value = true;
};

const onSure = () => {
  if (!isEqual(formData.themeColor, appStore.themeColor)) {
    appStore.changeThemeColor(formData.themeColor);
  }
  open.value = false;
};

const afterOpenChange = () => {
  // 切换抽屉时动画结束后的回调
};
</script>

<style>
.conat {
  display: none;
  visibility: hidden;
}
</style>