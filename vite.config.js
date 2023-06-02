import { defineConfig } from 'vite';

export default defineConfig({
   base: './',
   build: {
      assetsDir: '.',
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: Infinity,
      emptyOutDir: true,
      outDir: './app/assets'
   }
});
