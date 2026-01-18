import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: './mysite/static/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js')
      }
    }
  }
});