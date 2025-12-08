import request from "@/utils/request";

const DICT_BASE_URL = "/api/v1/dicts";

const DictAPI = {
  /** 获取字典项列表 */
  getDictItems(dictCode: string) {
    return request<any, DictItemOption[]>({
      url: `${DICT_BASE_URL}/${dictCode}/items`,
      method: "get",
    });
  },
};

export default DictAPI;

export interface DictItemOption {
  /** 值 */
  value: number | string;
  /** 标签 */
  label: string;
  /** 标签类型 */
  tagType?: "" | "success" | "info" | "warning" | "danger";
  [key: string]: any;
}
