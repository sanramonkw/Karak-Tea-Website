# Deploying karaktea.com (Astro rebuild)

Read this before cutting over from WordPress. This is a **pure static build**:
`npm run build` emits plain HTML/CSS/JS/assets into `dist/` — deploy that folder
to any static host (Netlify, Cloudflare Pages, Vercel static, S3+CloudFront,
nginx, shared hosting). **No server runtime, no database, no PHP, no Node
process in production.**

## Build

- **Node 20+** (Astro 5 requirement), npm.
- Install with `npm ci` (lockfile is committed).
- `npm run build` → expect **12 pages** (6 AR at root + 6 EN under `/en/`) plus
  `sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`, `llms.txt`, fonts and
  images. Build must end with `12 page(s) built` and no errors.
- **No environment variables** are needed — there is no `.env`, no secrets.
- Local check: `npx astro preview` and click through AR (root) + EN (`/en/`)
  pages.

## URL behavior — Arabic-first (root), English under `/en/`

**2026-07-12: Arabic is now the default locale, served at the site root**
(mirrors the same pattern used on marshmallows.co). This is a reversal of the
original build (which had EN at root, AR under `/ar/`) — see "301 redirect
map" below for what must redirect at the host.

- `/` = Arabic home, `dir="rtl"`. AR inner pages keep their original
  WordPress Arabic slugs at root: `/المنتجات/`, `/التحضير/`,
  `/آلات-التوزيع/`, `/أسئلة-مكررة/`, `/اتصل-بنا/`.
- `/en/` = English home, `dir="ltr"`. EN inner pages: `/en/products/`,
  `/en/preparation/`, `/en/vending-machine/`, `/en/faqs/`, `/en/contact-us/`.
- `trailingSlash` is **not configured** in `astro.config.mjs` (default
  `"ignore"`), and the build uses the default `format: 'directory'` — every
  page is `…/index.html` in a folder. Serve so that `/المنتجات/` and
  `/المنتجات` both resolve (default behavior on all mainstream static hosts).
  Canonical URLs in the HTML use trailing slashes — prefer a host-level
  redirect of the non-slash variant to the slash variant if configurable.
- **Encoded Arabic URLs must pass through untouched.** The AR routes keep the
  original WordPress slugs, e.g. `/المنتجات/`, `/التحضير/`,
  `/آلات-التوزيع/`, `/أسئلة-مكررة/`, `/اتصل-بنا/` — on disk these are
  percent-encoded directory names (`/%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA/…`).
  If a CDN/proxy (Cloudflare, nginx `proxy_pass`, etc.) sits in front, make
  sure it does **not** re-encode/double-encode or normalize these paths;
  request the percent-encoded path exactly as-is. Test all five AR inner
  pages after deploy — this is the most common static-host breakage for this
  site.

## 301 redirect map (Bold promotion + Arabic-first cutover, 2026-07-12)

The design was promoted from `variants/bold/` to master, and Arabic became
the default locale. Anyone who bookmarked/indexed the previous URL scheme
(EN at root, AR under `/ar/`) needs these 301s at the host/CDN:

| Old URL | New URL |
|---|---|
| `/` (was EN home) | `/en/` |
| `/products/` | `/en/products/` |
| `/preparation/` | `/en/preparation/` |
| `/vending-machine/` | `/en/vending-machine/` |
| `/faqs/` | `/en/faqs/` |
| `/contact-us/` | `/en/contact-us/` |
| `/ar/` | `/` |
| `/ar/المنتجات/` | `/المنتجات/` |
| `/ar/التحضير/` | `/التحضير/` |
| `/ar/آلات-التوزيع/` | `/آلات-التوزيع/` |
| `/ar/أسئلة-مكررة/` | `/أسئلة-مكررة/` |
| `/ar/اتصل-بنا/` | `/اتصل-بنا/` |

These are in addition to (not instead of) the pre-existing old-WordPress
fragment redirects below, whose targets also shift because EN moved to
`/en/`:

- `/home/*` (e.g. `/home/karak-tea/`, `/home/our-journey/`) → `/en/`
  (content was English; Arabic visitors landing here get the language
  switcher on `/en/` to reach `/`)
- `/site-faqs/*` → `/en/faqs/`
- `/site-products/*` → `/en/products/`
- `/site-contact/*` → `/en/contact-us/`
- `/site-footer/*` → `/en/`
- `/slides/*` → `/en/`
- Also keep `?p=` / `/feed/`-style WP leftovers 301'ing to `/en/` if the host
  allows pattern redirects.

Chain carefully: a host that only supports one redirect hop needs the old
WP-fragment rules rewritten directly to the final `/en/...` targets above
(do not rely on `/` → `/en/` happening twice).

## Forms, captcha & email (SMTP) — read before launch

**Current state:** the contact form (AR `/اتصل-بنا/`, EN `/en/contact-us/`)
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
2. **301 redirects — see the full map above** ("301 redirect map (Bold
   promotion + Arabic-first cutover, 2026-07-12)"): both the pre-existing
   old-WordPress fragment URLs AND the previous EN-root/`/ar/`-prefixed URL
   scheme from this rebuild's first release now need redirects.
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
   (`src/pages/index.astro` (AR) + `src/pages/en/index.astro` (EN)).
6. **Contact form has no backend.** The form currently composes a `mailto:` to
   info@karaktea.com in the browser (interim). WP used Contact Form 7 +
   reCAPTCHA. Wire a form service (Formspree/Basin/Netlify Forms) or a small
   serverless endpoint before or right after launch — see the inline `TODO`
   in `src/pages/اتصل-بنا.astro` (AR) and `src/pages/en/contact-us.astro` (EN).

## Post-launch smoke test (5 minutes)

- Load AR (root, default) — `/`, `/المنتجات/`, `/التحضير/`,
  `/آلات-التوزيع/`, `/أسئلة-مكررة/`, `/اتصل-بنا/` — and EN under `/en/` —
  `/en/`, `/en/products/`, `/en/preparation/`, `/en/vending-machine/`,
  `/en/faqs/`, `/en/contact-us/`. All 200, correct `<title>`
  ("… - شاي كرك" / "… - Karak Tea"), no tenant-bleed content.
- Language switch: العربية ↔ EN link on every page lands on the mirrored page
  (root ↔ `/en/`).
- `/` renders **Bold ("Electric Karak") design in Arabic RTL**
  (`<html lang="ar" dir="rtl">`), header/nav mirrored, sticky "Order Now" pill
  on the inline-end side. `/en/` renders the same design LTR
  (`<html lang="en" dir="ltr">`).
- View source on `/` and `/en/`: `<link rel="canonical">` present and correct
  for the new URLs, `hreflang="ar"` / `hreflang="en"` / `hreflang="x-default"`
  (→ Arabic) alternates present on every page pair, `Organization` JSON-LD
  present (FAQ pages additionally have `FAQPage`, products has `ItemList`).
- `sitemap-index.xml` and `robots.txt` reachable; favicon loads. Verify the
  301 map above is live (spot-check `/ar/` → `/`, `/products/` → `/en/products/`).
- Hero "electric field" renders (gradient-clipped h1, crossfading photo deck,
  hashtag marquee); scroll reveals fire; header pill deepens its shadow on
  scroll; sticky "Order Now" CTA visible on all pages.
- Submit the contact form once — a mail draft to info@karaktea.com must open
  (until a real form backend is wired).
