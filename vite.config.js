import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: './stuff/static/js/dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js')
      },
      output: {
        entryFileNames: 'main.js',
      }
    }
  }
});