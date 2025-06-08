import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { ResultEnum } from "@/enums/api/result.enum";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const assessToken = getAccessToken();
    // 如果 Authorizatio 设置为 no-auth,则不携带 token
    // if(config.headers.Authorization !== 'no-auth' && accessToken ) {
    //     config.headers.Authorization = `Bearer ${accessToken}`
    // } else {
    //     delete config.headers.Authorization
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果响应的是二进制流，直接返回 例：下载文件， Excel 导出
    if (response.config.responseType === "blob") {
      return response;
    }
    const { code, data, msg } = response.data;
    if (code === ResultEnum.SUCCESS) {
      return data;
    }
    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  async (error) => {
    console.error("request error", error); // for debug
    const { response } = error;
    if (response) {
      const { code, msg } = response.data;
      if (code === ResultEnum.ACCESS_TOKEN_INVALID) {
        // 刷新 Token 过期，刷新Token
        // return handleTokenRefresh(config)
      } else if (code === ResultEnum.REFRESH_TOKEN_INVALID) {
        // await handleSessionExpired()
        return Promise.reject(new Error(msg || "Error"));
      } else {
        ElMessage.error("系统出错");
      }
    }
    return Promise.reject(error.message);
  }
);

export default service;

/** 刷新 Token 处理 */

/** 处理会话过期 */
