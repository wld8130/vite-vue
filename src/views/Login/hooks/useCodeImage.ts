import { ref, onMounted } from 'vue';
import { checkImageExists, typeofFunction } from '/@/utils/common';

export const useCodeImage = (fetchFunc: () => Promise<any>) => {
  const loading = ref<boolean>(false);
  const imgUrl = ref<string>('');
  const failFlag = ref<boolean>(false);
  const getFetchData = async () => {
    if (fetchFunc && typeofFunction(fetchFunc)) {
      loading.value = true;
      const { code, data } = await fetchFunc();
      if (code !== 200) {
        loading.value = false;
        failFlag.value = true;
      } else {
        checkImageExists(data.imgUrl)
          .then(() => {
            imgUrl.value = data.imgUrl;
            failFlag.value = false;
          })
          .catch(() => {
            failFlag.value = true;
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
    failFlag,
    imgUrl,
    getFetchData,
  };
};
