import request from "@/utils/request";
const MENU_BASE_URL = "/api/v1/menus";

const MenuAPI = {
  /** 获取当前用户的路由列表 */
  getRoutes() {
    return request<any, RouteVO[]>({ url: `${MENU_BASE_URL}/routes`, method: "get" });
  },
  /** 获取菜单树形列表 */
  getList(queryParams: MenuQuery) {
    return request<any, MenuVO[]>({ url: `${MENU_BASE_URL}`, method: "get", params: queryParams });
  },
};

export default MenuAPI;

export interface MenuQuery {
  /** 搜素关键字 */
  keywords?: string;
}
import type { MenuTypeEnum } from "@/enums";
export interface MenuVO {
  /** 子菜单 */
  children?: MenuVO[];
  /** 组件路径 */
  component?: string;
  /** ICON */
  icon?: string;
  /** 菜单ID */
  id?: string;
  /** 菜单名称 */
  name?: string;
  /** 父菜单ID */
  parentId?: string;
  /** 按钮权限标识 */
  perm?: string;
  /** 跳转路径 */
  redirect?: string;
  /** 路由名称 */
  routeName?: string;
  /** 路由相对路径 */
  routePath?: string;
  /** 菜单排序(数字越小排名越靠前) */
  sort?: number;
  /** 菜单类型 */
  type?: MenuTypeEnum;
  /** 是否可见(1:显示;0:隐藏) */
  visible?: number;
}

export interface RouteVO {
  /** 子路由列表 */
  children: RouteVO[];
  /** 组件路径 */
  component?: string;
  /** 路由属性 */
  meta?: Meta;
  /** 路由名称 */
  name?: string;
  /** 路由路径 */
  path?: string;
  /** 跳转链接 */
  redirect?: string;
}

export interface Meta {
  /** 【目录】 只有一个子路由是否始终显示 */
  alwaysShow?: boolean;
  /** 是否隐藏（true-是 false-否） */
  hidden?: boolean;
  /** ICON */
  icon?: string;
  /** 【菜单】是否开启页面缓存 */
  keepAlive?: boolean;
  /** 路由title */
  title?: string;
}
