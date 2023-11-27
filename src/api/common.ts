import server from '/@/utils/request';

// 获取验证码
export function getCodeImgApi() {
  return server.request({
    url: '/captchaImage',
    method: 'get',
    noToken: true,
  });
}

// 登录
export function loginApi(data: any) {
  return server.request({
    url: '/login',
    method: 'post',
    noToken: true,
    data,
  });
}
