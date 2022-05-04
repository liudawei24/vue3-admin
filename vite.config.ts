import type { UserConfig, ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'

// 大概意思 cd process.cwd()(Node.js 进程的当前工作目录) + cd . + cd dir
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
// { command, mode }:ConfigEnv // 情景配置
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // Node.js 进程的当前工作目录
  const root = process.cwd()
  /**
   * 检查process.cwd()路径下.env.development.local、.env.development、.env.local、.env这四个环境文件。
   * 输出NODE_ENV和VITE_开头的键值对。
   * VITE_开头的键值对后面的不会覆盖前面的。
   * NODE_ENV的值后面的会覆盖前面的。
   */
  const env = loadEnv(mode, root)

  // loadEnv读取的布尔类型是一个字符串。该函数可以转换为布尔类型。
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  console.log({
    pathResolve,
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    isBuild,
  })
  return {
    plugins: [vue()],
  }
})
