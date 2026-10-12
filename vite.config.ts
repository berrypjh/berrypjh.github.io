import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Deployed as the GitHub Pages user site https://berrypjh.github.io/, served from the root. */
export default defineConfig({
  plugins: [react()],
  // the lazy Three.js chunk is ~570 kB by design; the warning stays live for anything larger
  build: { chunkSizeWarningLimit: 600 },
})
