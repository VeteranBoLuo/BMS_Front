import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import path from 'path';
export default defineConfig({
  esbuild: {
    // pure: ['console.log'], // 删除 console.log或
    drop: ['debugger'], // 删除 debugger
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // 默认就是false
  },

  plugins: [
    vueJsx(),
    vue(), //按需加载
    Components({
      dirs: ['src/components/BasicComponents/*'], // 按需加载的文件
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
      '/ws': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/ws/, ''),
      },
    },
    open: true,
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
