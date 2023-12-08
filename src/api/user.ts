import server from '/@/utils/request';

// 获取用户信息
export const userInfoApi = () => {
  return server.request({
    url: '/getInfo',
    method: 'get',
  });
};

// 获取路由信息
export const routersApi = () => {
  return server.request({
    url: '/getRouters',
    method: 'get',
  });
};
