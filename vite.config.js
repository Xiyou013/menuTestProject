import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { svgBuilder } from 'svg-plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgBuilder('./src/icons/svg/')],
  resolve: {
    alias: {
      "@": path.join(__dirname, 'src')
      // "#": path.join(__dirname, 'types')
    }
  },
  // webPreferences: {
  //   nodeIntegration: true,
  //   contextIsolation: false  //  把这一项加上错误就会消失
  // }
})
