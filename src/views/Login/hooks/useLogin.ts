import { ref } from 'vue';
import { loginApi } from '/@/api/common';
import Storage from '/@/utils/Storage';
import { STORAGE_TOKEN } from '/@/utils/consts';

export const useLogin = () => {
  const loading = ref<boolean>(false);

  const userLoginApi = async (value: any, resolve?: any, reject?: any) => {
    loading.value = true;
    const { code, data, token } = await loginApi(value);
    if (code !== 200) {
      loading.value = false;
      if (reject) {
        reject({ code, data });
      }
    } else {
      Storage.setCookie(STORAGE_TOKEN, token);
      loading.value = false;
      // 保存 token
      if (resolve) {
        resolve({ code, data });
      }
    }
  };

  return {
    loading,
    userLoginApi,
  };
};
