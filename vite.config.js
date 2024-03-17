import { fileURLToPath, URL } from 'node:url'

import eslint from '@nabla/vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint(),
    Components({
      resolvers: [
        PrimeVueResolver(),
      ],
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: { exclude: ["fsevents"] },
})
