import { defineConfig } from 'vite'; // eslint-disable-line
import vue from '@vitejs/plugin-vue'; // eslint-disable-line
import { VitePWA } from 'vite-plugin-pwa'; // eslint-disable-line
import vueSvgPlugin from 'vite-plugin-vue-svg';

export default defineConfig({
build: {
    assetsDir: 'static',

  },
  plugins: [
    vue(),
    vueSvgPlugin(),
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
