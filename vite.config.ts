import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathSrc = resolve(__dirname,"src")

export default defineConfig(({mode}) => {
  const env = loadEnv(mode,process.cwd())
  return {
    resolve:{
      alias:{
        "@":pathSrc
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
      vue()
    ],

  }
})
