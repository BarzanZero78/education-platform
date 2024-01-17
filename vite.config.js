import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "E-Learning",
        name: "Education Platform",
        description: "An education platform to learn programming",
        start_url: "/login",
        display: "standalone",
        background_color: "#ffffff",
        scope: "/",
        lang: "en",
      },
    }),
  ],
})
