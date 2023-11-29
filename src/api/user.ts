import server from '/@/utils/request';

// 获取用户信息
export const userInfoApi = (data: any) => {
  return server.request({
    url: '/getInfo',
    method: 'get',
    data,
  });
};
