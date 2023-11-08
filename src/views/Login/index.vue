<template>
  <div class="w-h-100v login-container">
    <div class="login-logo-area">
      <img :src="LOGO_WORD" class="logo-img" alt="logo" />
    </div>
    <div class="login-main">
      <div class="login-content">
        <LoginForm
          :codeLoading="loading"
          :codeFailFlag="failFlag"
          :codeImgUrl="imgUrl"
          :reFreshCode="getCodeImgData"
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
import { getCodeImgApi } from '/@/api/common';

const { loading, failFlag, imgUrl, getFetchData: getCodeImgData } = useCodeImage(getCodeImgApi);

const handleSubmit = (values: any) => {
  console.log('formData:', values);
};
</script>

<style lang="less">
.login-container {
  position: relative;
  // background: url(https://temp.dqalpha.com/static/pic/login-bgc.png) right no-repeat;
  background: url("/@/assets/img/login-background.png") right no-repeat;
  background-size: auto 100%;

  .login-logo-area {
    position: absolute;
    top: 30px;
    left: 42px;

    .logo-img {
      // width: auto;
      // width: 297px;
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