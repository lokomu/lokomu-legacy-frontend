import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import path from "path";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { VitePWA } from "vite-plugin-pwa";
import cssnano from "cssnano";

export default defineConfig({
  plugins: [
    cssnano({
      preset: "default",
    }),
    VitePWA({
      manifest: {
        name: "Del",
        short_name: "Del",
        description:
          "En app som skal gi folk fellesskap, basert på bosted og interesser.",
        start_url: "/",
        display: "fullscreen",
        background_color: "#FFFFFF",
        theme_color: "#03AA4B",
        lang: "no",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^\/api\/image\/\d+$/,
            handler: "CacheFirst",
            options: {
              cacheName: "api-images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: /\/api\/(.*)/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api",
            },
          },
        ],
      },
    }),
    vue(),
    eslint(),
    VueI18nPlugin({
      //runtimeOnly: false,
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/i18n/locales/**"
      ),
    }),
  ],
  test: {
    environment: "happy-dom",
    setupFiles: ["tests/test-setup.js"],
  },
  base: "./",
  server: {
    port: 8080,
    strictPort: true,
  },
  resolve: {
    extensions: [".js", ".vue", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      tests: path.resolve(__dirname, "./tests"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-related": ["vue", "vue-router", "vue-i18n"],
          vuelidate: ["@vuelidate/core", "@vuelidate/validators"],
          pinia: ["pinia", "pinia-plugin-persistedstate"],
          axios: ["axios"],
          socket: ["sockjs-client", "stompjs", "net"],
          misc: [
            "scrollama",
            "vue-cookies",
            "@kyvg/vue3-notification",
            "@vuepic/vue-datepicker",
            "compressorjs",
          ],
        },
      },
    },
  },
  allowConfigImport: true,
});
