import { ref, onMounted } from 'vue';
import { checkImageExists, typeofFunction } from '/@/utils/common';

/**
 * 解析图片地址
 * @param urlStr 带解析路径
 * @returns 图片地址
 */
const analysisImageUrl = (urlStr: string) => {
  let imgPath = '';
  const path = window.atob(urlStr);
  imgPath = `data:image/png;base64,${path}`;
  return imgPath;
};

export const useCodeImage = (fetchFunc: () => Promise<any>) => {
  const loading = ref<boolean>(false);
  const imgUrl = ref<string>('');
  const isFail = ref<boolean>(false);
  const uuidCode = ref<string>('');
  const getFetchData = async () => {
    if (fetchFunc && typeofFunction(fetchFunc)) {
      loading.value = true;
      const { code, img, uuid } = await fetchFunc();
      if (code !== 200) {
        loading.value = false;
        isFail.value = true;
      } else {
        const url = analysisImageUrl(img);
        // 针对若依框架，进行适配，处理图片路径
        checkImageExists(url)
          .then(() => {
            imgUrl.value = url;
            isFail.value = false;
            uuidCode.value = uuid;
          })
          .catch(() => {
            isFail.value = true;
          })
          .finally(() => {
            loading.value = false;
          });
      }
    }
  };

  onMounted(() => {
    getFetchData();
  });

  return {
    loading,
    isFail,
    imgUrl,
    uuidCode,
    getFetchData,
  };
};
