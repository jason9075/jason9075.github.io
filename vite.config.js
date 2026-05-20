import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function htmlAssemblePlugin() {
  const INCLUDE_RE = /<!--\s*include:\s*(.+?)\s*-->/g;
  return {
    name: 'html-assemble',
    transformIndexHtml(html) {
      return html.replace(INCLUDE_RE, (_, filePath) => {
        const fullPath = resolve(__dirname, filePath.trim());
        try {
          return readFileSync(fullPath, 'utf-8');
        } catch (e) {
          console.warn(`[html-assemble] Cannot include "${filePath}": ${e.message}`);
          return `<!-- missing: ${filePath} -->`;
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [htmlAssemblePlugin()],
  base: '/',
  publicDir: 'public',
  server: {
    port: 8080,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          data: ['./src/data/demos.js', './src/data/thumbs.js'],
        },
      },
    },
  },
});
