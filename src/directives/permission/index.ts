import { ROLE_ROOT } from "@/constants";
import { useUserStore } from "@/store";
import type { Directive } from "vue";

/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const requirePerms = binding.value;

    // 校验传入的权限值是否合法
    if (!requirePerms || (typeof requirePerms !== "string" && !Array.isArray(requirePerms))) {
      throw new Error(
        "需要提供权限识别！例如：v-has-perm=\"'sys:user:add'\" 或 v-has-perm=\"['sys:user:add]', 'sys:user:edit']\""
      );
    }

    const { roles, perms } = useUserStore().userInfo;

    // 超级管理员拥有所有权限。如果是“*:*:*”权限标识，则不需要进行权限校验
    if (roles.includes(ROLE_ROOT) || requirePerms.includes("*:*:*")) {
      return;
    }

    // 检查权限
    const hasAuth = Array.isArray(requirePerms)
      ? requirePerms.some((perm) => perms.includes(perm))
      : perms.includes(requirePerms);

    // 如果没有权限，移除该元素
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
};
