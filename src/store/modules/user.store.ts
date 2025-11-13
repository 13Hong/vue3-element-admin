// import { store } from "@/store";
import { AuthStorage } from "@/utils/auth";
import AuthAPI, { type LoginFormData } from "@/api/auth-api";
import UserAPI, { type UserInfo } from "@/api/system/user-api";

export const useUserStore = defineStore("user", () => {
  // 用户信息
  const userInfo = ref<UserInfo>({} as UserInfo);
  // 记住我状态
  const rememberMe = ref(AuthStorage.getRememberMe());

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
          rememberMe.value = LoginFormData.rememberMe;
          AuthStorage.setTokens(accessToken, refreshToken, rememberMe.value);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 获取用户信息
   *
   * @retunrs { UserInfo } 用户信息
   */
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      UserAPI.getInfo()
        .then((data) => {
          if (!data) {
            reject("Verification failed,please Login again");
            return;
          }

          Object.assign(userInfo.value, { ...data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return {
    login,
    isLoggedIn: () => !!AuthStorage.getAccessToken(),
    getUserInfo,
  };
});
