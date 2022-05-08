/**
 * Get the configuration file variable name
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return (
    `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
      // ↓换成大写
      .toUpperCase()
      // ↓将空白换成空字符串
      .replace(/\s/g, '')
  )
}
