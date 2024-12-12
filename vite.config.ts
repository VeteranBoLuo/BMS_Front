import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import path from 'path';
export default defineConfig({
  esbuild: {
    // pure: ['console.log'], // 删除 console.log或
    // drop: ['debugger'], // 删除 debugger
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // 默认就是false
  },

  plugins: [
    vueJsx(),
    vue(), //按需加载
    Components({
      dirs: ['src/components/BasicComponents/*'], // 指定组件所在目录
      directoryAsNamespace: true,
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver({
          importStyle: 'less',
        }),
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9001',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
        '/submit': {
            target: 'http://data.zz.baidu.com',
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/submit/, ''),
        },
    },
    open: true, // 自动打开浏览器
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: 'src',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: 'assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
    ],
  },
});
