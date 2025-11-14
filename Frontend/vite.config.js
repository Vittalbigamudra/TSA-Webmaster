// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Entry HTML lives in Public/Site
  root: resolve(__dirname, 'Public/Site'),

  // Build output goes to dist/
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },

  // Aliases for cleaner imports
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'Public/Components'),
      '@media': resolve(__dirname, 'Public/Media')
    }
  },

  // Static assets folder (served as-is at /)
  publicDir: resolve(__dirname, 'Public/Media')
});
