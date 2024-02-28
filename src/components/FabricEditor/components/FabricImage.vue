<template>
  <Upload
    accept=".png"
    :file-list="fileList"
    name="file"
    :before-upload="beforeUpload"
    :show-upload-list="false"
    :max-count="1"
  >
    <Button type="link"> 插入 </Button>
  </Upload>
</template>

<script lang="ts" setup name="FabricImage">
  import { ref } from 'vue';
  import { Upload, Button, message } from 'ant-design-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { convertImageFileToBase64 } from '/@/utils/common';

  const props = defineProps({
    afterGetImage: {
      type: Function,
    }
  });

  const fileList = ref<UploadProps['fileList']>([]);

  const beforeUpload = async (file: File) => {
    const isJSONFile = file.type === 'image/png';
    if (!isJSONFile) {
      message.error(`${file.name} is not a png file`);
    } else {
      const imgBase64 = await convertImageFileToBase64(file);
      if (imgBase64) {
        if (props.afterGetImage) {
          props.afterGetImage(imgBase64);
        }
      } else {
        message.error(`图片转base64失败！`);
      }
    }
    return false;
  };
</script>