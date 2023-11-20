import { defineStore } from 'pinia';
import { ref } from 'vue';
import { App } from 'ant-design-vue';
import type { MessageInstance } from 'ant-design-vue/es/message/interface';
import type { ModalStaticFunctions } from 'ant-design-vue/es/modal/confirm';
import type { NotificationInstance } from 'ant-design-vue/es/notification/interface';

const useAppStore = defineStore('app', () => {
  // 主题色
  const themeColor = ref<string>('#2F54EB');
  // 菜单收缩
  const collapsed = ref<boolean>(false);
  // 国际化
  const locale = ref<'zh' | 'en'>('zh');
  const message = ref<MessageInstance>();
  const notification = ref<NotificationInstance>();
  const modal = ref<Omit<ModalStaticFunctions, 'warn'>>();

  // const staticFunction = App.useApp();
  // message.value = staticFunction.message;
  // modal.value = staticFunction.modal;
  // notification.value = staticFunction.notification;

  (() => {
    const staticFunction = App.useApp();
    message.value = staticFunction.message;
    modal.value = staticFunction.modal;
    notification.value = staticFunction.notification;
  })();

  /**
   * 修改主题色
   * @param color : 主题色;
   */
  const changeThemeColor = (color: string) => {
    themeColor.value = color;
  };

  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  const changeLocale = (value: 'zh' | 'en') => {
    locale.value = value;
  };

  return {
    themeColor,
    changeThemeColor,
    collapsed,
    toggleCollapsed,
    locale,
    changeLocale,
    message,
    notification,
    modal,
  };
});

export default useAppStore;
