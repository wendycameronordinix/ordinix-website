import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',  // Make sure this is set
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        book: resolve(__dirname, 'book.html'),
      },
    },
  },
})
