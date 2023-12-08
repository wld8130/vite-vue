import { routersApi } from '/@/api/user';
import { messageWithKey } from '/@/hooks/useMessageKey';
import useUserStore from '/@/store/modules/user';
import Storage from '/@/utils/Storage';
import { STORAGE_TOKEN } from '/@/utils/consts';

export const useRouterList = () => {
  const userStore = useUserStore();
  const getRouterList = () => {
    return new Promise((resolve, reject) => {
      routersApi()
        .then(({ code, data, msg }) => {
          if (code !== 200) {
            messageWithKey.error(msg);
            Storage.removeCookie(STORAGE_TOKEN);
            userStore.resetUserInfo();
            reject();
          } else {
            resolve({ routerList: data });
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  return {
    getRouterList,
  };
};
