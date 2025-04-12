import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), vueJsxPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    strictPort: true,
    port: 5173,
    host: '0.0.0.0',
  },
})
