import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, 'Private'));

  return {
    root: resolve(__dirname, 'Public/Site'),
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'Public/Site/index.html'),
          resources: resolve(__dirname, 'Public/Site/resources.html'),
          highlights: resolve(__dirname, 'Public/Site/highlights.html'),
          submission: resolve(__dirname, 'Public/Site/submission.html'),
          about: resolve(__dirname, 'Public/Site/about.html'),
          contact: resolve(__dirname, 'Public/Site/contact.html'),
          calendar: resolve(__dirname, 'Public/Site/calendar.html')
        }
      }
    },
    resolve: {
      alias: {
        '@components': resolve(__dirname, 'Public/Components'),
        '@media': resolve(__dirname, 'Public/Media')
      }
    },
    publicDir: resolve(__dirname, 'Public/Media'),
    define: {
      'import.meta.env.VITE_MAPTILER_KEY': JSON.stringify(env.VITE_MAPTILER_KEY)
    }
  };
});
