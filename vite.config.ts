import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'


const pathSrc = resolve(__dirname,"src")

export default defineConfig(({mode}: ConfigEnv) => {
  const env = loadEnv(mode,process.cwd())
  return {
    resolve:{
      alias:{
        "@":pathSrc
      }
    },
    css:{
      preprocessorOptions:{
        scss:{
          additionalData: `@use "@/styles/variables.scss" as * `
        }
      }
    },
    server:{
      host:"0.0.0.0",
      port:+env.VITE_APP_PORT,
      open:true,
      proxy:{
        // 代理 /dev-api 请求
        [env.VITE_APP_BASE_API]:{
          changeOrigin:true,
          target:env.VITE_APP_API_URL,
          rewrite:(path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API),'')
        }
      }
    },
    plugins:[
      vue(),
      UnoCSS(),
      AutoImport({
        imports:["vue"],
        resolvers:[
          ElementPlusResolver({ importStyle:"sass" })
        ],
        vueTemplate:true,
        dts:resolve(pathSrc,'types','auto-imports.d.ts') // 自动导入组建类型声明文件
      }),
      Components({
        resolvers:[
          ElementPlusResolver({ importStyle:'sass' })
        ],
        dts:resolve(pathSrc,'types','components.d.ts')
      })
    ],
    optimizeDeps: {
      include: ['element-plus/theme-chalk/dark/css-vars.css']
    },
  }
})
