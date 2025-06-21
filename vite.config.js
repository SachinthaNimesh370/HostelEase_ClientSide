import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['e6c3-2a09-bac1-4300-00-3c1-37.ngrok-free.app'], // ← your Ngrok URL
    host: true // ← allow external access (required for ngrok)
  }
  
})
