// https://eslint.org/docs/latest/use/configure/configuration-files-new

import eslint from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import globals from "globals";
import configPrettier from "eslint-config-prettier";
// TypeScript支持
import * as typescriptEslint from "typescript-eslint";

// 解析自动导入配置
import fs from "node:fs";
let autoImportGlobals = {};
try {
  autoImportGlobals =
    JSON.parse(fs.readFileSync("./.eslintrc-auto-import.json", "utf-8")).globals || {};
} catch (error) {
  // 文件不存在或解析错误时使用空对象
  console.warn("Could not load auto-import globals", error);
}

// Element Plus组件
const elementPlusComponents = {
  // Element Plus 组件添加为全局变量，避免 no-undef 报错
  ElInput: "readonly",
  ElSelect: "readonly",
  ElSwitch: "readonly",
  ElCascader: "readonly",
  ElInputNumber: "readonly",
  ElTimePicker: "readonly",
  ElTimeSelect: "readonly",
  ElDatePicker: "readonly",
  ElTreeSelect: "readonly",
  ElText: "readonly",
  ElRadioGroup: "readonly",
  ElCheckboxGroup: "readonly",
  ElOption: "readonly",
  ElRadio: "readonly",
  ElCheckbox: "readonly",
  ElInputTag: "readonly",
  ElForm: "readonly",
  ElFormItem: "readonly",
  ElTable: "readonly",
  ElTableColumn: "readonly",
  ElButton: "readonly",
  ElDialog: "readonly",
  ElPagination: "readonly",
  ElMessage: "readonly",
  ElMessageBox: "readonly",
  ElNotification: "readonly",
  ElTree: "readonly",
};

export default [
  // TypeScript 推荐配置
  ...typescriptEslint.configs.recommended,

  // Vue 推荐配置
  ...pluginVue.configs["flat/recommended"],

  // 基础 JavaScript 配置
  eslint.configs.recommended,

  // 全局配置
  {
    // 指定要检查的文件
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    ignores: ["node_modules/**", "dist/**", "build/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser, // 浏览器环境全局变量
        ...globals.node, // Node.js 环境全局变量
        ...autoImportGlobals, // 自动导入的 API 函数
        ...elementPlusComponents, // Element Plus 组件
        // 全局类型定义，解决 TypeScript 中定义但 ESLint 不识别的问题
        PageQuery: "readonly",
        PageResult: "readonly",
        OptionType: "readonly",
        ResponseData: "readonly",
        ExcelResult: "readonly",
        TagView: "readonly",
        AppSettings: "readonly",
        __APP_INFO__: "readonly",
      },
      parser: parserTypeScript,
      parserOptions: {
        sourceType: "module",
      },
    },
    rules: {
      // 基础规则
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

      // ES6+ 规则
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",

      // 最佳实践
      eqeqeq: "off",
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],

      // 禁用与 TypeScript 冲突的规则
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },

  // Vue 配置
  {
    files: ["**/*.vue"],
    plugins: {
      vue: pluginVue,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        parser: parserTypeScript,
      },
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
        },
      ],
      "vue/no-unused-vars": "off",
    },
  },

  // TypeScript 配置
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_", // 忽略以下划线开头的参数
          varsIgnorePattern: "^(_|[A-Z][A-Z0-9_]*$)", // 忽略下划线开头的变量和全大写的常量/枚举
        },
      ],
      "@typescript-eslint/no-unused-expressions": "warn",
    },
  },

  // CURD 组件配置
  {
    files: ["**/components/CURD/**/*.{ts,vue}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Prettier 集成
  {
    rules: {
      ...configPrettier.rules,
    },
  },
];
