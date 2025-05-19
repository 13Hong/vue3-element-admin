import { defineConfig } from 'unocss'

export default defineConfig({
    // 自定义快捷类
    shortcuts:{
        "wh-full": "w-full h-full",
        "flex-center": "flex justify-center items-center",
        "flex-x-center": "flex justify-center",
        "flex-y-center": "flex items-center",
        "flex-x-start": "flex items-center justify-start",
        "flex-x-between": "flex items-center justify-between",
        "flex-x-end": "flex items-center justify-end"
    },
    theme:{
        colors:{
            primary: "var(--el-color-primary)",
            primary_dark: "var(--el-color-primary-light-5)",
        },
        breakpoints:Object.fromEntries(
            [640,768,1024,1280,1536,1920,2560].map((size,index) => [
                ["sm","md","lg","xl","2xl","3xl","4xl"][index],
                `${size}px`
            ])
        )
    }
})