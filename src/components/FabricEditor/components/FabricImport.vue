<template>
  <Upload
    accept=".json"
    :file-list="fileList"
    name="file"
    :before-upload="beforeUpload"
    :show-upload-list="false"
    :max-count="1"
  >
    <Button type="link"> 导入 </Button>
  </Upload>
</template>

<script lang="ts" setup name="FabricImport">
  import { ref } from 'vue';
  import { Upload, Button, message } from 'ant-design-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { readFileText } from '/@/utils/common';

  const props = defineProps({
    afterGetFile: {
      type: Function,
    }
  });

  const fileList = ref<UploadProps['fileList']>([]);

  const beforeUpload = async (file: File) => {
    const isJSONFile = file.type === 'application/json';
    if (!isJSONFile) {
      message.error(`${file.name} is not a json file`);
    } else {
      const textResult = await readFileText(file);
      if (textResult) {
        console.log(textResult)
        if (props.afterGetFile) {
          props.afterGetFile(textResult);
        }
      } else {
        message.error(`文件读取失败,请重新尝试！`);
      }
    }
    return false;
  };
</script>