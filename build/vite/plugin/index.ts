import { PluginOption } from 'vite'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  // const {
  //   VITE_USE_IMAGEMIN,
  //   VITE_USE_MOCK,
  //   VITE_LEGACY,
  //   VITE_BUILD_COMPRESS,
  //   VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  // } = viteEnv
  console.log(viteEnv, isBuild)

  const vitePlugins: (PluginOption | PluginOption[])[] = []
  return vitePlugins
}
