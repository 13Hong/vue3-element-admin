<template>
  <div>
    <h3 text-center m-0 mb-20px>登 录</h3>
    <el-form
      :model="loginFormData"
      :rules="loginRules"
      ref="loginFormRef"
      size="large"
      :validate-on-rule-change="false"
    >
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model.trim="loginFormData.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-tooltip :visible="isCapsLock" content="大写锁定已打开" placement="right">
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginFormData.password"
            placeholder="请输入密码"
            type="password"
            show-password
            @keyup="checkCapsLock"
            @keyup.enter="handleLoginSubmit"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>

      <!-- 验证码 -->
      <el-form-item prop="captchaCode">
        <div flex items-center gap-10px>
          <el-input
            v-model.trim="loginFormData.captchaCode"
            placeholder="请输入验证码"
            clearbale
            class="flex-1"
            @keyup.enter="handleLoginSubmit"
          >
            <template #prefix>
              <div class="i-svg:captcha" />
            </template>
          </el-input>
          <div cursor-pointer h-40px w-120px flex-center @click="getCaptcha">
            <el-icon v-if="codeLoading" class="is-loading" size="20"><Loading /></el-icon>
            <img
              v-else-if="captchBase64"
              border-rd-4px
              object-cover
              shadow="[0_0_0_1px_var(--el-border-color)_inset]"
              :src="captchBase64"
              alt="captchaCode"
            />
            <el-text v-else type="info" size="small">点击获取验证码</el-text>
          </div>
        </div>
      </el-form-item>

      <div flex-x-between w-full>
        <el-checkbox v-model="loginFormData.rememberMe">记住我</el-checkbox>
        <el-link type="primary" underline="never" @click="toOtherForm('resetPwd')">
          忘记密码？
        </el-link>
      </div>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="primary" class="w-full" @click="handleLoginSubmit">
          登 录
        </el-button>
      </el-form-item>

      <div flex-center gap-10px>
        <el-text size="default">您没有帐号?</el-text>
        <el-link type="primary" underline="never" @click="toOtherForm('register')">注册</el-link>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import AuthAPI from "@/api/auth-api";
// import router from "@/router";

// const route = useRoute();
onMounted(() => getCaptcha());

const loginFormRef = ref<FormInstance>();
const loading = ref(false);
// 是否大小写锁定
const isCapsLock = ref(false);
// 验证码图片Base64字符串
const captchBase64 = ref();

const loginFormData = ref({
  username: "admin",
  password: "123456",
  captchaKey: "",
  captchaCode: "",
  rememberMe: false,
});

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输入账户名",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输入密码",
      },
      {
        min: 6,
        message: "密码长度不能小于6位",
        trigger: "blur",
      },
    ],
    // captchaCode: [
    //   {
    //     required: true,
    //     trigger: "blur",
    //     message: ("login.message.captchaCode.required"),
    //   },
    // ],
  };
});

/**
 * 获取验证码
 */
const codeLoading = ref(false);
function getCaptcha() {
  codeLoading.value = true;
  AuthAPI.getCaptcha()
    .then((data) => {
      loginFormData.value.captchaKey = data.captchaKey;
      captchBase64.value = data.captchaBase64;
    })
    .finally(() => {
      codeLoading.value = false;
    });
}

/**
 * 登录提交
 */
async function handleLoginSubmit() {
  try {
    loading.value = true;
    console.log("登录提交");
  } catch (error) {
    console.error("登录失败", error);
  } finally {
    loading.value = false;
  }
}

/**
 * 检查输入大小写
 */
function checkCapsLock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapsLock.value = event.getModifierState("CapsLock");
  }
}

const emit = defineEmits(["update:modelValue"]);
function toOtherForm(type: "register" | "resetPwd") {
  emit("update:modelValue", type);
}
</script>

<style lang="scss" scoped></style>
