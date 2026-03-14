import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'CookieBanner.jsx',
      name: 'CookieBanner',
      fileName: (format) => `CookieBanner.${format}.js`,
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      // React is external — loaded separately via CDN (keeps bundle small)
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    // Inline the CSS import so the .css file is handled separately
    cssCodeSplit: false,
  },
})
