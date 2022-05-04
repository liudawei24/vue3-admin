import type { UserConfig, ConfigEnv } from 'vite'
import pkg from './package.json'
import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { generateModifyVars } from './build/generate/generateModifyVars'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'

// 大概意思 cd process.cwd()(Node.js 进程的当前工作目录) + cd . + cd dir
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
    VITE_DROP_CONSOLE,
    isBuild,
  })
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      https: true,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // 从.env加载代理配置
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // 👇 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },

    plugins: createVitePlugins(viteEnv, isBuild),
  }
})
