// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Production deploys (karaktea.com) must NOT set DEPLOY_TARGET: they get the
// real domain at the root. Only the GitHub Pages review deploy (built via
// scripts/build-all.sh / npm run build:all) sets DEPLOY_TARGET=pages, which
// switches `site`/`base` to the project-pages URL so all internal links and
// asset URLs (via the withBase() helper in src/utils/paths.ts) resolve
// correctly under /Karak-Tea-Website/.
const isPagesDeploy = process.env.DEPLOY_TARGET === 'pages';

export default defineConfig({
  site: isPagesDeploy ? 'https://sanramonkw.github.io' : 'https://karaktea.com',
  base: isPagesDeploy ? '/Karak-Tea-Website/' : '/',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ar',
        locales: {
          ar: 'ar',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
