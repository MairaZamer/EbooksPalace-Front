import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/create-checkout-session': 'https://ebookspalace.onrender.com'
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
