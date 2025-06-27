import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  server: {
    host: true,
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
    },
    allowedHosts: ['website.pixelhubhost.com', 'www.pixelhubhost.com'],
  },

  build: {
    sourcemap: false,
  },
});