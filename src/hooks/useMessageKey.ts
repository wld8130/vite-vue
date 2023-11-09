import { message } from 'ant-design-vue';
import { MESSAGE_KEY } from '/@/utils/consts';
import { VNode } from 'vue';

export const useMessageKey = () => {
  const messageWithKey = {
    info: (content: string | VNode) => message.info({ content, key: MESSAGE_KEY }),
    success: (content: string | VNode) => message.success({ content, key: MESSAGE_KEY }),
    error: (content: string | VNode) => message.error({ content, key: MESSAGE_KEY }),
    warning: (content: string | VNode) => message.warning({ content, key: MESSAGE_KEY }),
    loading: (content: string | VNode) => message.loading({ content, key: MESSAGE_KEY }),
    open: message.open,
    destroy: message.destroy,
  };
  return {
    messageWithKey,
  };
};
