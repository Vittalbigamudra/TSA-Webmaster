// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env from Private folder
  const env = loadEnv(mode, resolve(__dirname, 'Private'));

  return {
    root: resolve(__dirname, 'Public/Site'),
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true
    },
    resolve: {
      alias: {
        '@components': resolve(__dirname, 'Public/Components'),
        '@media': resolve(__dirname, 'Public/Media')
      }
    },
    publicDir: resolve(__dirname, 'Public/Media'),

    // Expose env variables to client
    define: {
      'import.meta.env.VITE_MAPTILER_KEY': JSON.stringify(env.VITE_MAPTILER_KEY)
    }
  };
});
