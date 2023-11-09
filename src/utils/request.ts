import axios, { InternalAxiosRequestConfig, Canceler, AxiosResponse } from 'axios';
import { useMessageKey } from '../hooks/useMessageKey';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    noToken?: boolean;
    neverCancel?: boolean;
  }
}

const CancelToken = axios.CancelToken;

const server = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 记录正在进行的请求
const pending: any[] = [];

/**
 * 取消重复请求
 * @param config axiosConfig
 * @param cancel 取消函数
 */
const removePending = (config: InternalAxiosRequestConfig, cancel: Canceler | null) => {
  const flgUrl = config?.url;
  if (pending.includes(flgUrl)) {
    if (cancel) {
      // 取消请求（message 参数是可选的）
      cancel('请勿频繁操作');
    } else {
      pending.splice(pending.indexOf(flgUrl), 1); // 删除记录
    }
  } else {
    if (cancel) {
      pending.push(flgUrl);
    }
  }
};

// 请求拦截器 （取消重复请求，判断是否携带token）
server.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1.对get请求进行特殊处理
    // 2.判断是否携带token
    // 3.取消重复请求
    // 4.最大并发数量(?)

    // 是否携带token标志
    const noToken = config.noToken || false;
    // 是否取消重复请求
    const neverCancel = config.neverCancel || false;
    if (!neverCancel) {
      // 生成 cancelToken
      config.cancelToken = new CancelToken((c: Canceler) => {
        removePending(config, c);
      });
    }

    // 2.判断是否携带token

    if (!noToken) {
      Object.assign(config.headers, {
        Authorization: 'Bearer ' + 'edu_college_token',
      });
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
server.interceptors.response.use((res: AxiosResponse<any>) => {
  // 对响应数据做点什么
  // 对请求成功的请求删除记录
  removePending(res.config, null);

  const { code = 200, msg } = res.data;

  // 对不同的code进行处理

  console.log(code, msg);

  return res.data;
}, function (error) {
  // 对响应错误做点什么
  const { messageWithKey } = useMessageKey();
  const { config, message: errorMsg } = error;
  // 对请求成功的请求删除记录
  removePending(config, null);
  let alertMsg = errorMsg;
  if (errorMsg == 'Network Error') {
    alertMsg = '后端接口连接异常';
  } else if (errorMsg.includes('timeout')) {
    alertMsg = '系统接口请求超时';
  } else if (errorMsg.includes('Request failed with status code 424')) {
    // Modal.destroyAll();
    // Modal.confirm({
    //   content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
    //   onOk: () => {
    //     store.dispatch('user/logout');
    //   },
    //   onCancel: () => {
    //     Modal.destroyAll();
    //   },
    // });
    // return Promise.reject();
  } else if (errorMsg.includes('Request failed with status code')) {
    alertMsg = '系统接口' + errorMsg.substr(errorMsg.length - 3) + '异常';
  }
  messageWithKey.error(alertMsg);
  return Promise.reject(error);
});

export default server;
