import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { ApiCodeEnum } from "@/enums/api/code.enum";
import { AuthStorage } from "./auth";
import { authConfig } from "@/settings";
import { useTokenRefresh } from "@/composables/auth/useTokenRefresh";
import { redirectToLogin } from "@/utils/auth";

// 初始化token刷新组合式函数
const { refreshTokenAndRetry } = useTokenRefresh();

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = AuthStorage.getAccessToken();
    // 如果 Authorizatio 设置为 no-auth,则不携带 token
    if (config.headers.Authorization !== "no-auth" && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果响应的是二进制流，直接返回 例：下载文件， Excel 导出
    if (response.config.responseType === "blob" || response.config.responseType === "arraybuffer") {
      return response;
    }
    const { code, data, msg } = response.data;

    // 请求成功
    if (code === ApiCodeEnum.SUCCESS) {
      return data;
    }

    // 业务错误
    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  async (error) => {
    console.error("request error", error); // for debug

    const { response, config } = error;

    console.log("response", response);
    console.log("config", config);

    // 网络错误或服务器未响应
    if (!response) {
      ElMessage.error("网络连接失败，请检查网络设置");
      return Promise.reject(error);
    }

    const { code, msg } = response.data;

    switch (code) {
      case ApiCodeEnum.ACCESS_TOKEN_INVALID:
        // Access Token 过期
        if (authConfig.enableTokenRefresh) {
          // 启用了token刷新，尝试刷新
          return refreshTokenAndRetry(config, service);
        } else {
          // 未启用token刷新，直接跳转登录页
          await redirectToLogin("登录已过期，请重新登录");
          return Promise.reject(new Error(msg || "Access Token Invalid"));
        }

      case ApiCodeEnum.REFRESH_TOKEN_INVALID:
        // Refresh Token 过期，跳转登录页
        await redirectToLogin("登录已过期，请重新登录");
        return Promise.reject(new Error(msg || "Refresh Token Invalid"));

      default:
        ElMessage.error(msg || "系统出错");
        return Promise.reject(new Error(msg || "Error"));
    }
  }
);

export default service;

/** 刷新 Token 处理 */

/** 处理会话过期 */
