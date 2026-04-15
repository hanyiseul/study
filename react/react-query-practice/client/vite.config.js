import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174, // 원하는 포트 번호로 변경
    strictPort: true, // 설정한 포트가 사용 중일 때 자동으로 다음 포트로 넘어가지 않음
    allowedHosts: [
      '.trycloudflare.com'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})