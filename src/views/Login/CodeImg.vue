<template>
  <div class="code-img-container" @click="handleClick">
    <Spin v-if="loading" />
    <template v-else>
      <img v-if="!fialedFlag" :src="imgUrl" alt="code" srcset="" />
      <div v-else>图片加载失败</div>
    </template>
  </div>
</template>

<script setup lang="ts" name="CodeImg">
import { Spin } from 'ant-design-vue';
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  fialedFlag: {
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['clickCode']);

const handleClick = () => {
  emit('clickCode');
};
</script>

<style lang="less">
.code-img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  cursor: pointer;
}
</style>
