import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ksetrin.github.io/',
  build: {
    outDir: './',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
  },
});
