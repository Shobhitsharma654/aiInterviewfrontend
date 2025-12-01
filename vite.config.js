import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Increase chunk size limit from 500kb → 1500kb
    chunkSizeWarningLimit: 1500,

    // Optional but recommended: split node_modules into vendor.js
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"
          }
        }
      }
    }
  }
})
