// import { message } from 'ant-design-vue';
import type { MessageArgsProps } from 'ant-design-vue';
import { typeofObject } from '/@/utils/common';
// import { MESSAGE_KEY } from '/@/utils/consts';

export const useMessage = () => {
  // const [messageApi] = message.useMessage();
  const messageWithKey = (params: MessageArgsProps) => {
    if (!typeofObject(params)) {
      throw new Error('参数错误，应为对象');
    }
    // messageApi.error({ ...params, key: MESSAGE_KEY });
  };
  return {
    messageWithKey,
  };
};
