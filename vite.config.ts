import { defineConfig } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'

// 大概意思 cd process.cwd()(Node.js 进程的当前工作目录) + cd . + cd dir
// function pathResolve(dir: string) {
//   return resolve(process.cwd(), '.', dir)
// }

// https://vitejs.dev/config/
// {command, mode }:ConfigEnv // 情景配置
export default defineConfig(({}: ConfigEnv): UserConfig => {
  // const root = process.cwd(); Node.js 进程的当前工作目录
  return {
    plugins: [vue()],
  }
})
