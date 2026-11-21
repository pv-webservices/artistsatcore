import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import templates, { devContactApi } from './src/build/vite-plugin-templates.mjs';

const pages = {
  home: 'index.html',
  work: 'our-work/index.html',
  services: 'services/index.html',
  ai: 'ai-video-production-gurgaon/index.html',
  gallery: 'gallery/index.html',
  contact: 'contact-us/index.html',
  notFound: '404.html',
};

export default defineConfig({
  publicDir: 'static', // original client assets stay untouched in public/ (source library)
  plugins: [templates(), devContactApi()],
  server: { port: 5173, host: true },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssMinify: true,
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([k, v]) => [k, resolve(import.meta.dirname, v)])),
    },
  },
});
