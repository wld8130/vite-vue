import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<any>({});
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

  return {
    userInfo,
    handeleSetUserInfo,
    roles,
    handleSetRoles,
    permissions,
    handleSetPermissions,
    avatar,
    handleSetAvatar,
  };
});

export default useUserStore;
