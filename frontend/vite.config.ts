/**
 * Node modules
 */
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@/server': path.resolve(__dirname, '../server'),
      '@/shared': path.resolve(__dirname, '../shared'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});
