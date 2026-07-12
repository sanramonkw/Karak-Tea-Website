# Karak Tea — karaktea.com (Astro rebuild)

Modern Astro 5 + Tailwind 4 rebuild of karaktea.com, migrated off WordPress
(bilingual AR/EN with original Arabic slugs, full SEO/GEO layer).

- **Design:** the owner chose the **Bold ("Electric Karak")** variant as the
  final design; it was promoted to this root project on 2026-07-12 (the
  previous master is preserved on the `pre-bold-promotion` branch).
- **Locale:** **Arabic is the default, served at the site root** (`/`,
  `/المنتجات/`, …, `dir="rtl"`); **English lives under `/en/`**
  (`/en/`, `/en/products/`, …, `dir="ltr"`) — same pattern as marshmallows.co.
- **Start here:** `CLAUDE.md` (project context & design tokens) and
  `DEPLOYMENT.md` (read before deploying — includes the old→new 301 map).
- **Run:** `npm install && npm run dev` · build with `npm run build` (static `dist/`).
- **`variants/premium|editorial/`** — two remaining alternative design
  directions of the same site (same content/URLs/SEO, different visual
  language), still available for comparison. Each is a self-contained Astro
  project with its own `VARIANT.md`. `variants/bold/` no longer exists as a
  separate folder — it **is** this root project now.
