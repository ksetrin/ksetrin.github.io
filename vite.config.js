import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  root: 'src',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: true,
  },
});
