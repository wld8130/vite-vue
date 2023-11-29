import { ref } from 'vue';
import { loginApi } from '/@/api/common';
import Storage from '/@/utils/Storage';
import { STORAGE_TOKEN } from '/@/utils/consts';
import { messageWithKey } from '/@/hooks/useMessageKey';
import { useRouter } from 'vue-router';
import { isNotEmpty } from '/@/utils/common';

export const useLogin = () => {
  const loading = ref<boolean>(false);
  const router = useRouter();

  const userLoginApi = async (value: any, resolve?: any, reject?: any) => {
    loading.value = true;
    const { code, token, msg } = await loginApi(value);
    if (code !== 200) {
      loading.value = false;
      messageWithKey.error(msg);
      if (reject) {
        reject();
      }
    } else {
      if (isNotEmpty(token)) {
        Storage.setCookie(STORAGE_TOKEN, token);
      }
      loading.value = false;
      messageWithKey.success(msg);
      // 保存 token
      if (resolve) {
        resolve();
      }
      // 跳转至登录页
      // 1.记录登出的位置需还原
      router.push('/');
    }
  };

  return {
    loading,
    userLoginApi,
  };
};
