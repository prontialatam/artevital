import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { legalRoutes } from './src/content/legal';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        root: resolve(import.meta.dirname, 'index.html'),
        es: resolve(import.meta.dirname, 'es/index.html'),
        en: resolve(import.meta.dirname, 'en/index.html'),
        ...Object.fromEntries(['es', 'en'].flatMap(lang => legalRoutes.map(route => [`${lang}-${route}`, resolve(import.meta.dirname, lang, route, 'index.html')]))),
      },
    },
  },
});
