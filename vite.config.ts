import { defineConfig } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'

// 大概意思 cd __dirname(当前模块的目录名) + cd . + cd dir
// function pathResolve(dir: string) {
//   return resolve(__dirname, '.', dir)
// }

// https://vitejs.dev/config/
export default defineConfig(
  ({}: // command,
  // mode,
  ConfigEnv): UserConfig => {
    return {
      plugins: [vue()],
    }
  }
)
