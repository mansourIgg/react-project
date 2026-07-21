// vite.config.ts
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api-proxy": {
        target: "https://staging.silkbooth.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, "/rest"),
      },
    },
  },
})