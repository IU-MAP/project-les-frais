import { defineConfig } from 'vite'; // eslint-disable-line
import vue from '@vitejs/plugin-vue'; // eslint-disable-line
import { VitePWA } from 'vite-plugin-pwa'; // eslint-disable-line
// @ts-ignore
import transformSvg from './src/transformSvg.js';

export default defineConfig({
  build: {
    assetsDir: 'static',
  },
  plugins: [
    vue(),
    transformSvg(),
    VitePWA({
      manifest: {
        background_color: '#6c6ee5',
        theme_color: '#fff',
        name: 'Les Frais',
        short_name: 'les-frais',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {},
    }),
  ],
});
