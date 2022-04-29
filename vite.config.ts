import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'

// 大概意思 cd __dirname + cd . + cd dir
// function pathResolve(dir: string) {
//   return resolve(__dirname, '.', dir)
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
