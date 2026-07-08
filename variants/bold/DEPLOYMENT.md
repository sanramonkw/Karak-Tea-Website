# Deploying karaktea.com (Astro rebuild)

Read this before cutting over from WordPress. This is a **pure static build**:
`npm run build` emits plain HTML/CSS/JS/assets into `dist/` — deploy that folder
to any static host (Netlify, Cloudflare Pages, Vercel static, S3+CloudFront,
nginx, shared hosting). **No server runtime, no database, no PHP, no Node
process in production.**

## Build

- **Node 20+** (Astro 5 requirement), npm.
- Install with `npm ci` (lockfile is committed).
- `npm run build` → expect **12 pages** (6 EN + 6 AR) plus `sitemap-index.xml`,
  `sitemap-0.xml`, `robots.txt`, `llms.txt`, fonts and images. Build must end
  with `12 page(s) built` and no errors.
- **No environment variables** are needed — there is no `.env`, no secrets.
- Local check: `npx astro preview` and click through EN + AR pages.

## URL behavior

- `trailingSlash` is **not configured** in `astro.config.mjs` (default
  `"ignore"`), and the build uses the default `format: 'directory'` — every
  page is `…/index.html` in a folder. Serve so that `/products/` and
  `/products` both resolve (default behavior on all mainstream static hosts).
  Canonical URLs in the HTML use trailing slashes — prefer a host-level
  redirect of the non-slash variant to the slash variant if configurable.
- **Encoded Arabic URLs must pass through untouched.** The AR routes keep the
  original WordPress slugs, e.g.
  `/ar/المنتجات/`, `/ar/التحضير/`, `/ar/آلات-التوزيع/`, `/ar/أسئلة-مكررة/`,
  `/ar/اتصل-بنا/` — on disk these are percent-encoded directory names
  (`/ar/%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA/…`). If a CDN/proxy
  (Cloudflare, nginx `proxy_pass`, etc.) sits in front, make sure it does
  **not** re-encode/double-encode or normalize these paths; request the
  percent-encoded path exactly as-is. Test all five AR inner pages after
  deploy — this is the most common static-host breakage for this site.

## Forms, captcha & email (SMTP) — read before launch

**Current state:** the contact form (EN `/contact-us/`, AR `/ar/اتصل-بنا/`)
submits via a **mailto fallback** — it opens the visitor's mail app; no server
receives anything and there is **no spam protection**. The WordPress site's
Contact Form 7 + Google reCAPTCHA did NOT survive the migration (the reCAPTCHA
keys live in the owner's Google account and were not ported). Do not re-add
Google reCAPTCHA — the agreed replacement is **Cloudflare Turnstile**.

**The relay Worker is already built** at `../form-relay-worker/` — follow its
README (developer runbook: deploy commands, secret injection, and the full
per-site form-wiring guide).

**Agreed plan (2026-07-03; owner decisions tracked in
`../progress/QUESTIONS.md`):** one shared **Cloudflare Worker form relay** for
all four sites + Turnstile.

> **Owner confirmed (2026-07-05): Turnstile is already in use in their
> Cloudflare account.** Get the site + secret key from the owner's existing
> setup (verify the widget's hostname list covers all four domains —
> karaktea.com, foodhacks.co, sanramonkw.com, marshmallows.co — or have them
> add a widget for these domains). Do not introduce any other captcha.

To enable, before or at launch:

1. **Turnstile keys** from the owner's Cloudflare dashboard (one widget
   covering all four domains). The *site key* is public and gets baked into
   the form markup at build time; the *secret key* goes ONLY into the Worker
   env — never into this repo.
2. **Deploy the form relay Worker** and point the form at its endpoint
   (replace the mailto interception marked TODO in the contact page script).
3. **SMTP / email delivery settings** live in the Worker env, not here
   (Resend/MailChannels API key, or SMTP host + user + password). Destination
   inbox: **info@karaktea.com** (the mailto address in the form source).
4. **Test end-to-end:** a real submission arrives in the inbox, Turnstile
   verifies, and a bot-style instant submission (honeypot) is rejected.

Until this is done the form stays mailto-only — workable for a soft launch,
but treat wiring it as a launch-week task, not a someday task.

## Pre-launch checklist

1. **DNS cutover + retire the old origin.** The current WP origin (Kinsta
   behind Cloudflare) has a known vhost mix-up: it intermittently serves
   *other tenants' sites* on karaktea.com URLs. After cutover, verify the old
   origin is fully retired/unbound so stale DNS or Cloudflare origin rules
   can't resurrect it. Check `curl -H 'Host: karaktea.com' <old-ip>` returns
   nothing meaningful before releasing.
2. **301 redirects for old WP URLs.** Real pages map 1:1 (same slugs, EN and
   AR). Additionally, redirect the WordPress CPT/fragment URLs that were in
   the old sitemap (they were content fragments, not pages — see CLAUDE.md
   "Page inventory"):
   - `/home/*` (e.g. `/home/karak-tea/`, `/home/our-journey/`) → `/`
   - `/site-faqs/*` → `/faqs/`
   - `/site-products/*` → `/products/`
   - `/site-contact/*` → `/contact-us/`
   - `/site-footer/*` → `/`
   - `/slides/*` → `/`
   Also keep `?p=` / `/feed/`-style WP leftovers 301'ing to `/` if the host
   allows pattern redirects.
3. **Analytics (owner's call).** The WP site ran GA4 `G-T3ZED4Q23J` and GTM
   `GTM-PTC2HN8`. They were deliberately **not** migrated. If the owner wants
   continuity, add the GA4/GTM snippet to
   `src/layouts/BaseLayout.astro` `<head>` and rebuild.
4. **robots / sitemap / Search Console.** `robots.txt` already points at
   `https://karaktea.com/sitemap-index.xml`. After cutover, submit the new
   sitemap in Google Search Console (property already exists via the WP site's
   Site Kit) and watch coverage for the AR encoded URLs.
5. **srkw.co "Shop Now" links.** Hero slides 2–3 CTAs point to
   `https://srkw.co/` (kept verbatim from the live site); slide 1 and the
   nav "Order Now" point to thiafa.com. Confirm with the owner whether all
   CTAs should target thiafa.com before or shortly after launch
   (`src/pages/index.astro` + `src/pages/ar/index.astro`).
6. **Contact form has no backend.** The form currently composes a `mailto:` to
   info@karaktea.com in the browser (interim). WP used Contact Form 7 +
   reCAPTCHA. Wire a form service (Formspree/Basin/Netlify Forms) or a small
   serverless endpoint before or right after launch — see the inline `TODO`
   in `src/pages/contact-us.astro` and `src/pages/ar/اتصل-بنا.astro`.

## Post-launch smoke test (5 minutes)

- Load `/`, `/products/`, `/preparation/`, `/vending-machine/`, `/faqs/`,
  `/contact-us/` — and the AR mirrors `/ar/`, `/ar/المنتجات/`, `/ar/التحضير/`,
  `/ar/آلات-التوزيع/`, `/ar/أسئلة-مكررة/`, `/ar/اتصل-بنا/`. All 200, correct
  `<title>` ("… - Karak Tea" / "… - شاي كرك"), no tenant-bleed content.
- Language switch: العربية ↔ EN link on every page lands on the mirrored page.
- AR pages render RTL (`<html dir="rtl">`), header/nav mirrored.
- View source on `/` and `/ar/`: `<link rel="canonical">` present and correct,
  `hreflang` alternates present, `Organization` JSON-LD present (FAQ pages
  additionally have `FAQPage`, products has `ItemList`).
- `sitemap-index.xml` and `robots.txt` reachable; favicon loads.
- Hero slider crossfades and pager dots work; header shrinks on scroll.
- Submit the contact form once — a mail draft to info@karaktea.com must open
  (until a real form backend is wired).
