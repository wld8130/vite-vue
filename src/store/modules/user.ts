import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserInfoType } from '/@/types/user';

const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfoType>();
  // 角色
  const roles = ref<string[]>([]);
  // 权限
  const permissions = ref<string[]>([]);
  // 头像
  const avatar = ref<string>('');

  const setUserInfo = (info: any) => {
    userInfo.value = info;
  };

  const setRoles = (roleList: string[]) => {
    roles.value = roleList;
  };

  const setPermissions = (permissionList: string[]) => {
    permissions.value = permissionList;
  };

  const setAvatar = (imgUrl: string) => {
    avatar.value = imgUrl;
  };

  return {
    userInfo,
    setUserInfo,
    roles,
    setRoles,
    permissions,
    setPermissions,
    avatar,
    setAvatar,
  };
});

export default useUserStore;
