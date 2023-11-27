import { ref } from 'vue';
import useUserStore from '/@/store/modules/user';

export const useLogin = () => {
  const userStore = useUserStore();

  const loading = ref<boolean>(false);

  console.log(userStore);

  return {
    loading,
  };
};
