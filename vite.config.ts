import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'es2020',
    minify: true,
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          supabase: ['@supabase/supabase-js'],
          auth: ['@supabase/auth-ui-react', '@supabase/auth-ui-shared']
        }
      }
    },
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['lucide-react']
  },
  server: {
    port: 5173,
    hmr: {
      overlay: false,
      port: 24678
    },
    fs: {
      strict: false
    }
  }
});
