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
  <Drawer
    v-model:open="open"
    :headerStyle="{
      display: 'none'
    }"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    <Row>
      <Col :span="24" class="margin-bottom-12">主题色</Col>
      <Col :span="24">
        <Input type="color" class="width-128" />
      </Col>
      <Col :span="24">
        <Divider />
      </Col>
    </Row>
  </Drawer>
</template>

<script lang="ts" setup name="SystemDrawer">
import { ref } from 'vue';
import {
  SettingOutlined,
} from '@ant-design/icons-vue';
import { FloatButton, Drawer, Row, Col, Input, Divider } from "ant-design-vue";

const open = ref<boolean>(false);

const handleShowModal = () => {
  open.value = true;
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