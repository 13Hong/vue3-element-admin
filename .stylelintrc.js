module.exports = {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue",
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended",
  ],
  rules: {
    // 允许 v-deep 选择器
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep", "global"],
      },
    ],
    // 允许 v-deep 选择器
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["page"],
      },
    ],
    // 允许特定的 at 规则
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin",
        ],
      },
    ],
    // 允许空源
    "no-empty-source": null,
    // 允许特定的单位
    "unit-no-unknown": [
      true,
      {
        ignoreUnits: ["rpx"],
      },
    ],
    // 允许特定的属性
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["composes"],
      },
    ],
    // 允许特定的选择器
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
      },
    ],
  },
};
