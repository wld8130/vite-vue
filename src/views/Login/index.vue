<template>
  <div class="w-h-100v login-container">
    <div class="login-logo-area">
      <img :src="LOGO_WORD" class="logo-img" alt="logo" />
    </div>
    <div class="login-main">
      <div class="login-content">
        <LoginForm
          :codeLoading="loading"
          :codeFailFlag="isFail"
          :codeImgUrl="imgUrl"
          :reFreshCode="getCodeImgData"
          :submitLoading="submitLoading"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
  import LOGO_WORD from '/@/assets/img/logo-word.png';
  import LoginForm from './LoginForm.vue';
  import { useCodeImage } from './hooks/useCodeImage';
  import { useLogin } from './hooks/useLogin';
  import { getCodeImgApi } from '/@/api/common';

  const { loading, isFail, imgUrl, uuidCode, getFetchData: getCodeImgData } = useCodeImage(getCodeImgApi);

  const { loading: submitLoading } = useLogin();

  const handleSubmit = (values: any) => {
    console.log('formData:', values, uuidCode);
  };
</script>

<style lang="less">
  .login-container {
    position: relative;
    background: url("/@/assets/img/login-background.png") right no-repeat;
    background-size: auto 100%;

    .login-logo-area {
      position: absolute;
      top: 30px;
      left: 42px;

      .logo-img {
        height: 70px;
      }
    }

    .login-main {
      position: absolute;
      top: 20%;
      left: 10%;

      .login-content {
        width: 424px;
        padding: 12px;
      }
    }
  }
</style>