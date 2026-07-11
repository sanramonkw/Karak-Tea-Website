// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Production value (kept for reference): site: 'https://karaktea.com'
  // GitHub Pages review deployment:
  site: 'https://sanramonkw.github.io',
  base: '/Karak-Tea-Website/variants/editorial/',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          ar: 'ar',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
