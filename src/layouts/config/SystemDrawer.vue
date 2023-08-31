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
  <a-drawer
    v-model:open="open"
    :headerStyle="{
      display: 'none'
    }"
    class="custom-class"
    root-class-name="root-class-name"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    <a-form :model="form" layout="vertical">
      <a-row>
        <a-col :span="24">
          <a-form-item label="主题色" name="themeColor">
            <a-input v-model:value="form.themeColor" placeholder="Please enter user name" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Url" name="url">
            <a-input
              v-model:value="form.url"
              style="width: 100%"
              addon-before="http://"
              addon-after=".com"
              placeholder="please enter url"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Owner" name="owner">
            <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
              <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
              <a-select-option value="mao">Maomao Zhou</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Type" name="type">
            <a-select v-model:value="form.type" placeholder="Please choose the type">
              <a-select-option value="private">Private</a-select-option>
              <a-select-option value="public">Public</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Approver" name="approver">
            <a-select v-model:value="form.approver" placeholder="Please choose the approver">
              <a-select-option value="jack">Jack Ma</a-select-option>
              <a-select-option value="tom">Tom Liu</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="DateTime" name="dateTime">
            <a-date-picker
              v-model:value="form.dateTime"
              style="width: 100%"
              :get-popup-container="(trigger) => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea v-model:value="form.description" :rows="4" placeholder="please enter url description" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup name="SystemDrawer">
import { ref, reactive } from 'vue';
import {
  SettingOutlined,
} from '@ant-design/icons-vue';
import { FloatButton } from "ant-design-vue";

const open = ref<boolean>(false);

const form = reactive({
  themeColor: '',
  url: '',
  owner: '',
  type: '',
  approver: '',
  dateTime: null,
  description: '',
});

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