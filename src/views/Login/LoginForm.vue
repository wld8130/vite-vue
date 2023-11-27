<template>
  <div class="login-form-title">欢迎登录</div>
  <Form
    :model="formState"
    name="login"
    autocomplete="off"
    :rules="rules"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <FormItem name="username" class="padding-bottom-18">
      <a-input v-model:value="formState.username" class="login-form-input" />
    </FormItem>

    <FormItem name="password" class="padding-bottom-18">
      <a-input-password v-model:value="formState.password" class="login-form-input" />
    </FormItem>

    <Row :gutter="[16, 16]" class="padding-bottom-18">
      <Col :span="12">
        <FormItem name="code">
          <a-input v-model:value="formState.code" class="login-form-input" />
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem>
          <CodeImg
            :loading="codeLoading"
            :fialed-flag="codeFailFlag"
            :img-url="codeImgUrl"
            @click-code="handleClickCode"
            class="w-h-100 login-form-code"
          />
        </FormItem>
      </Col>
    </Row>

    <FormItem>
      <a-button type="primary" html-type="submit" :loading="submitLoading" class="login-form-submit">登录</a-button>
    </FormItem>
  </Form>
</template>

<script lang="ts" setup name="LoginForm">
  import { Form, FormItem, Row, Col } from 'ant-design-vue';
  import { reactive } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import CodeImg from './CodeImg.vue';
  import { typeofFunction } from '/@/utils/common';

  interface FormState {
    username: string;
    password: string;
    code: string;
  }

  const props = defineProps({
    codeLoading: {
      type: Boolean,
      default: false
    },
    codeFailFlag: {
      type: Boolean,
      default: false
    },
    codeImgUrl: {
      type: String,
      required: true
    },
    reFreshCode: {
      type: Function,
    },
    submitLoading: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['submit']);

  const formState = reactive<FormState>({
    username: '',
    password: '',
    code: '',
  });

  const rules: Record<string, Rule[]> = {
    username: [
      { required: true, message: '请输入用户名' },
    ],
    password: [{ required: true, message: '请输入登录密码' }],
    code: [{ required: true, message: '请输入验证码' }],
  };

  const handleClickCode = () => {
    if (props.reFreshCode && typeofFunction(props.reFreshCode)) {
      props.reFreshCode();
    }
  };

  const onFinish = (values: any) => {
    emit('submit', values);
    // console.log('Success:', values);
  };

  const onFinishFailed = () => {
    // console.log('Failed:', errorInfo);
  };
</script>

<style lang="less">
  @height-input: 48px;

  .login-form-title {
    padding-bottom: 48px;
    font-family: 'AlibabaPuHuiTi-2-65-Medium';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
  }

  .login-form-input {
    height: @height-input;
    font-size: 16px;
  }

  .login-form-code {
    height: calc(@height-input - 2px);
  }

  .login-form-submit {
    width: 100%;
    height: 48px;
    border-top: transparent;
    background: linear-gradient(180deg, #7ABAF7 9.9%, #3D72F3 98.44%);
    box-shadow: 0 4px 20px 0 rgb(47 84 235 / 20%);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
  }

  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper {
    border-bottom: 2px solid #ff4d4f;
    border-color: #d9d9d9;
  }

  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover,
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    border-color: #d9d9d9;
    border-bottom-color: #ffa39e;
  }

  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus,
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:focus {
    border-bottom-color: #ff4d4f;
  }
</style>