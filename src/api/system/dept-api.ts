import request from "@/utils/request";

const DEPT_BASE_API = "/api/v1/dept";

const DeptAPI = {
  /** 获取部门下拉数据源 */
  getOptions() {
    return request<any, OptionType[]>({ url: `${DEPT_BASE_API}/options`, method: "get" });
  },
};

export default DeptAPI;
