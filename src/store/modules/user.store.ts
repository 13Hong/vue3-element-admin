// import { store } from "@/store";

import AuthAPI, { type LoginFormData } from "@/api/auth-api";

export const useUserStore = defineStore("user", () => {
  // 用户信息
  // const userInfo = ref<UserInfo>({} as UserInfo)
  // 记住我状态
  // const rememberMe = ref(AuthStoreage.getRememberMe())

  /**
   * 登录
   *
   * @param { LoginFormData}
   * @returns
   */
  function login(LoginFormData: LoginFormData) {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(LoginFormData)
        .then((data) => {
          const { accessToken, refreshToken } = data;
          // 保存记住我状态和token
          // rememberMe.value = LoginFormData.rememberMe
          // AuthStorage.setTokens(accessToken,refreshToken,rememberMe.value)
          console.log("登录成功！！！！", accessToken, refreshToken);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return {
    login,
  };
});
