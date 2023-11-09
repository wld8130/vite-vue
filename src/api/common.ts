import server from '/@/utils/request';

// 获取验证码
export function getCodeImgApi() {
  return server.request({
    url: '/captchaImage',
    method: 'get',
    noToken: true,
  });
}
