import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 必须导入这个 v4 专用插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. 必须在这里激活它，否则 CSS 里的 @import "tailwindcss" 无效
  ],
  base: '/digital-memory/', // 3. 确保你的部署路径正确
})
