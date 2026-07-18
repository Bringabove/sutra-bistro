import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg)$/i,
      includePublic: true,
      logStats: true,
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    {
      name: 'preload-css-assets',
      transformIndexHtml(html, { bundle }) {
        if (!bundle) return html;
        const cssFiles = Object.keys(bundle).filter(key => key.endsWith('.css'));
        const tags = cssFiles.map(file => `<link rel="preload" href="/${file}" as="style" />`).join('\n    ');
        if (tags) {
          return html.replace(
            '<link rel="preconnect" href="https://sutra-bistro-api.onrender.com"',
            `${tags}\n    <link rel="preconnect" href="https://sutra-bistro-api.onrender.com"`
          );
        }
        return html;
      }
    }
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
