import request from "@/utils/request";

const AUTH_BASE_URL = "/api/v1/auth";

const AuthAPI = {
  /**
   * 获取验证码接口
   */
  getCaptcha() {
    return request<any, CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
    });
  },
};

export default AuthAPI;

/** 验证码信息 */
export interface CaptchaInfo {
  // 验证码缓存key
  captchaKey: string;
  // 验证码图片Base64字符串
  captchaBase64: string;
}
