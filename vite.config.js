import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Force Vite to pre-bundle React and router together so there is
    // only one React instance across all dependencies (avoids "invalid hook
    // call" when the dep-scan is interrupted by a missing package).
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'lucide-react'],
  },
  resolve: {
    // Deduplicate React — ensures every import resolves to the same copy.
    dedupe: ['react', 'react-dom'],
  },
})
