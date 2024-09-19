import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// import resolve from '@rollup/plugin-node-resolve';
import { svgBuilder } from './src/plugins/svgBuilder'


export default defineConfig({
  // 配置svg图片引用文件
  plugins: [vue(), svgBuilder('./src/package/icons/svg/'),],
  server: {
    port: 5174
  },
  // 设置根目录别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  build: {
    // 这是一个vite的属性，表示css文件是分开打包还是放在一个css文件中，默认是分开打包，false的话是只有一个css文件输出
    cssCodeSplit: false,
    // 构建的库
    lib: {
      // 设置库的入口路径
      entry: path.resolve(__dirname, "./src/package/index.js"),
      // 构建的库名称
      name: 'packageLib',
      // 库里面的文件名称
      fileName: 'lib'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖,解决插件报错问题(reading 'isCE')
      external: ['vue'],
      // 输出配置
      output: {
        // 文件名称格式化
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return `index.css`; // 直接去掉哈希值
          }
          return `[name].[ext]`; // 其他资源文件保留哈希值
        },
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      },
    },
  },
})
