import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  server: {
    port: 7027
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Chuyển sang API hiện đại của Sass
        api: 'modern'
      }
    }
  }
})
