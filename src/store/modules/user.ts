import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserInfoType } from '/@/types/user';
import { loginApi } from '/@/api/common';

const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfoType>();
  // 角色
  const roles = ref<string[]>([]);
  // 权限
  const permissions = ref<string[]>([]);
  // 头像
  const avatar = ref<string>('');

  const handeleSetUserInfo = (info: any) => {
    userInfo.value = info;
  };

  const handleSetRoles = (roleList: string[]) => {
    roles.value = roleList;
  };

  const handleSetPermissions = (permissionList: string[]) => {
    permissions.value = permissionList;
  };

  const handleSetAvatar = (imgUrl: string) => {
    avatar.value = imgUrl;
  };

  const getUserInfoApi = async (value: any, resolve?: any, reject?: any) => {
    const { code, data } = await loginApi(value);
    if (code !== 200) {
      console.log(code);
      if (reject) {
        reject();
      }
    } else {
      console.log(data);
      if (resolve) {
        resolve();
      }
    }
  };

  return {
    userInfo,
    handeleSetUserInfo,
    roles,
    handleSetRoles,
    permissions,
    handleSetPermissions,
    avatar,
    handleSetAvatar,
    getUserInfoApi,
  };
});

export default useUserStore;
