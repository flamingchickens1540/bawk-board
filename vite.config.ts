import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({configFile:"../svelte.config.js"})],
  root: './frontend',
  logLevel: "warn",
  publicDir:false,
  build: {
    rollupOptions: {
      input: [
        "./frontend/index.html",
        "./frontend/alliance/index.html",
        "./frontend/audience/index.html",
        "./frontend/auth/index.html",
        "./frontend/event/index.html",
        "./frontend/match/index.html",
        "./frontend/rankings/index.html",
        "./frontend/scoring/index.html"
      ],
      
    },
    outDir: '../dist/frontend',
  }
})
