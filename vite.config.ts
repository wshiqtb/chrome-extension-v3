import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { chromeExtension } from 'vite-plugin-chrome-extension';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#00838f',
        },
        javascriptEnabled: true,
      }
    }
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json",
    }
  },
  plugins: [
    vue(), 
    chromeExtension(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: "less" })],
      dts: true
    })
  ]
})
