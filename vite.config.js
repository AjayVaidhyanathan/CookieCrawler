import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'cdn-entry.jsx',
      name: 'CookieBanner',
      fileName: (format) => `CookieBanner.${format}.js`,
      formats: ['umd', 'es'],
    },
    // React is bundled in — Framer does not expose React/ReactDOM as globals
    cssCodeSplit: false,
  },
})
