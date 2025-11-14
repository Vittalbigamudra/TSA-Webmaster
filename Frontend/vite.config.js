import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Tell Vite your HTML entry lives in Public/Site
  root: resolve(__dirname, 'Public/Site'),

  // Keep node_modules resolution at project root
  resolve: {
    alias: {
      '@': resolve(__dirname, 'Public/Components'), // optional shortcut
    }
  },

  // Where to put the build output
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },

  // Static assets folder (optional)
  publicDir: resolve(__dirname, 'Public/Media')
});
