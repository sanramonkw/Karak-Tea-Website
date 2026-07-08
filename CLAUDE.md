# karaktea.com — Astro rebuild

## What this is

A ground-up rebuild of **https://karaktea.com** (Karak Tea — a Kuwaiti instant
karak-tea premix brand owned by San Ramon General Trading) as a static Astro
site, migrating the owner off WordPress 7.0 (custom theme "Karak Tea" by
Surajit Kayal, Polylang for i18n, Yoast SEO, Contact Form 7). The owner
authorized pulling all assets and copy from the live site; all page copy is
kept **verbatim** from the original (EN + AR).

Built 2026-07-02. Last verified build: `npm run build` → 12 pages, no errors.

## Tech stack (and why)

- **Astro 5** — static output, zero JS by default, per-page SEO control,
  first-class content sites. Replaces the WP/PHP/jQuery stack.
- **Tailwind CSS 4** via `@tailwindcss/vite` — design tokens live in
  `src/styles/global.css` under `@theme`; a handful of component classes port
  the original theme's bespoke patterns (split backgrounds, check-lists, cards).
- **@astrojs/sitemap** — generates `sitemap-index.xml` with en/ar i18n
  annotations (configured in `astro.config.mjs`, `site: 'https://karaktea.com'`).
- No frameworks/islands needed: the only JS is the hero slider crossfade,
  the mobile nav toggle, header scroll shadow, and the interim mailto form
  handler — all small inline `<script>`s.

## How to run

```bash
npm install
npm run dev       # local dev server
npm run build     # static build to dist/  (must pass before shipping)
npm run preview
```

## Local preview

A long-running preview serves this site's `dist/` on **port 4321**
(sibling sites use 4322–4324 — leave those alone):

```bash
npx astro preview --port 4321 --host 127.0.0.1   # run from this folder
```

The owner previews it via SSH port-forwarding:
`ssh cybertruck -L 4321:127.0.0.1:4321` → http://localhost:4321.
**Never create public tunnels for previews**, and never touch the machine's
`cybertruck` cloudflared tunnel — it is a system service carrying the owner's
SSH access.

## Deployment

See **`DEPLOYMENT.md`** (developer guide — read before deploy): pure static
`dist/`, Node 20+, redirect map for old WP URLs, encoded-Arabic-URL proxy
note, analytics re-add, pre-launch checklist and post-launch smoke test.

## Design tokens (extracted from the original theme CSS)

Source: `https://karaktea.com/wp-content/themes/karaktea/style.css`
(theme header: "Theme Name: Karak Tea"). Tokens live in
`src/styles/global.css` `@theme`.

### Colors

| Token | Hex | Original usage |
|---|---|---|
| `--color-brand` | `#96358e` | `.txt-purple1`, buttons, nav links, footer icons |
| `--color-brand-deep` | `#b91877` | `.txt-purple2`, pagehero shrink bg |
| `--color-brand-light` | `#e7b2d6` | `.txt-purple3`, half-background2 split color |
| `--color-brand-pale` | `#deb8d7` | product-card hover bg |
| `--color-brand-overlay` | `#8d3279` | hero slider content gradient `rgba(141,50,121,.7–.9)` |
| `--color-accent` / `--color-accent-bright` | `#be1622` / `#ff0033` | `.theme-red` text gradient (unused on current pages, kept for parity) |
| `--color-ink` | `#2e3131` | heading color |
| body text | `#000` on `#fff` | body |

### Fonts (self-hosted in `public/fonts/`, pulled from the WP theme)

| Role | Family | File | Original alias |
|---|---|---|---|
| Headings (h1–h6, nav) | Bahij Janna Bold | `Bahij-Janna-Bold.ttf` | `'Font-Bold'` |
| Medium | Bahij Janna Regular | `Bahij-Janna-Regular.ttf` | `'Font-Medium'` |
| Body | Helvetica Arabic | `helvetica-arabic.ttf` | `'Font-Regular'` |

Note: the WP head also linked Google Fonts **Montserrat 400/700**, but the
theme CSS never references it — intentionally not loaded here.

### Color/layout fidelity pass (2026-07-02)

A Playwright screenshot + getComputedStyle diff against the live site
(1440x900, EN+AR home, products, contact) verified/corrected the following —
**do not regress these**:

- **Nav links are black, 16px, UPPERCASE** ('Font-Bold'), `li` margins
  `0 15px`; the **active page's link is `#96358e`** — *except on the home
  page, which shows no active highlight* (quirk kept from the live WP site).
  The language-switch link is black like the rest. No hover color change.
- **Header**: `padding: 10px 0`, logo `Karak_New.png` at **120px wide**
  (header ≈140px tall), `logo-text.png` 110px beside it; inner pages have a
  `1px #ededed` bottom border, home has none. On scroll >25px the header gets
  `.shrinked` (bg `rgba(255,255,255,.97)`, zero padding, logo 70px,
  logo-text 80px) — ported from the WP theme; there is **no** scroll shadow.
- **Home hero**: `.hero-slider` has `margin-top: -30px` (tucks under the
  fixed header; no page-top spacer on home). Content panel `margin-top:
  360px` → panel top lands at y=330 like live. Pager dots are **16px, `#222`,
  active `#b91877`**, ~70px above the slider bottom. Slider CTA is bold.
- **Split sections** (`#wrap-section` port): padding **80px 0** (`py-20`);
  grid is **12-col: image `col-span-5`, copy `col-span-6` with a 1-col gap**
  (not 50/50), copy has 50px inline padding; `h2` is 40px/40px with
  `margin: 60px 0 10px`, **white on variant 1, `#96358e` on variant 2**
  (base heading color sits in `@layer base` so utilities can override — keep
  it layered!); divider line is **4px** tall, white, `margin: 15px 0 20px`;
  images get `border: 1px solid #fff`.
- **Mobile hero copy block**: h2 30px `#96358e`; CTA is the **purple-outline**
  `.btn-outline-brand` (15px/30px padding), not the filled button.
- **Products**: card titles are `<h2>` (like live), 18px `#96358e`.
- **Contact**: submit button is **full column width**; distributor flags fill
  the card width (300x202 ratio); phone line = `#b91877` phone icon +
  **black** bold number; live shows **no** visible country names (they're
  commented out in the WP markup) and no "email us directly" line.
- **Footer**: `rgba(0,0,0,0.03)` bg, `padding: 30px 0 20px`, 14px text; small
  purple mobile/envelope icons before the phone/email links; phone link has
  no `dir="ltr"` so AR renders "4332 2220 965+" exactly like live.
  **Intentional deviation (owner request, 2026-07-06): all three footer
  columns are CENTER-aligned** — the live WP site's start/end alignment was a
  bug the owner wanted fixed in the rebuild. Do NOT "correct" this back to
  match live in future fidelity passes.

### Signature visual patterns (ported in `global.css`)

- `.half-bg-1` / `.half-bg-2` — tea-leaves pattern
  (`public/images/branding/leaves-pattern.png`, original file
  `KarakTea®-leaves-new.png`) tiled over a 50/50 split gradient
  (purple/white and white/light-purple). Direction flips under `[dir="rtl"]`.
- `.checked-list` — check-icon bullets (`check-white.png` from the theme).
- `.page-hero` — inner-page hero, leaves pattern bottom-left on `#fcfcfc`,
  48px purple `h1`.
- `.card-product` — bordered card, hover: `#deb8d7` bg + `scale(1.05)`.
- Hero slider: 3 full-bleed photos, 3.6s crossfade, purple gradient content
  panel (desktop only; mobile shows a plain copy block — same as original).
- Buttons: square (no radius), purple fill → white/purple-outline on hover;
  white-outline variant on the slider.

## Page inventory

### Rebuilt (12/12 real pages)

| Route | Source (WordPress) | Notes |
|---|---|---|
| `/` | Home | slider + 4 split sections (Karak Tea / Product / Our Journey / About Us) |
| `/products/` | Products | 14 product cards → thiafa.com shop links |
| `/preparation/` | Preparation | steps image + YouTube embed (`0DdPepASq1w`) |
| `/vending-machine/` | Vending Machine | linked hero image → thiafa vending tag |
| `/faqs/` | FAQs | 7 Q&As, `<details>` accordion + FAQPage JSON-LD |
| `/contact-us/` | Contact us | form + 10 distributor cards |
| `/ar/` … `/ar/اتصل-بنا/` | Arabic mirrors | same 6 pages, original Arabic slugs preserved (`المنتجات`, `التحضير`, `آلات-التوزيع`, `أسئلة-مكررة`, `اتصل-بنا`), full RTL |

The WP sitemap also listed CPT/fragment URLs (`/home/...` sections,
`/site-faqs/...`, `/site-products/...`, `/site-footer/...`, `/site-contact/...`,
`/slides/...`). These are **WordPress internal content fragments**, not real
pages — their content is embedded in the pages above. No standalone pages were
skipped.

### Business facts used across the site

- Phone/WhatsApp: **+965 2220 4332** · Email: **info@karaktea.com**
- Tagline hashtag: `#ForEveryMoment` / `#لـكـل_لـحـظـة`
- Socials: Facebook `Karak-Tea-1646050772339040`, Twitter `karakteaom`,
  Instagram `karakteakw`, WhatsApp `wa.me/96522204332`
- Web store ("Order Now" / "Shop Now"): https://thiafa.com/en/ and /ar/
  (slides 2–3 CTA pointed at https://srkw.co/ — kept verbatim)
- Distributors (contact page, `src/data/distributors.ts`): UK, Canada, USA,
  Egypt, UAE, Bahrain, Qatar, Jordan, Iraq, South Africa — with phone / email /
  IG / site per the original.

## Source assets

- `source-assets/` — everything pulled from the live site with **original
  filenames**: `images/` (50), `fonts/` (3 TTF), `branding/` (6: logos,
  favicon/logo `Karak_New.png`, `logo-text.png`, old `logo.png`, leaves
  pattern, check icons). Full URL provenance in **`source-assets/MANIFEST.md`**.
- `public/images/` — web copies; Arabic-named product PNGs were renamed to
  ASCII (e.g. `zaafran-كرك-500جرام-1024x1024.png` → `saffron-1kg.png`);
  mapping is visible in `src/pages/products.astro` vs the manifest.
- Favicon: `public/favicon.png` (= `Karak_New.png`, same as original).

> Migration gotcha: the origin (Kinsta behind Cloudflare) occasionally served
> a *different site's* response for karaktea.com URLs (vhost mix-up). The
> asset downloader verified magic bytes and retried; if you fetch more assets,
> verify content, don't trust a single response.

## SEO / GEO implemented

- Per-page `<title>` + meta description (titles match the WP/Yoast originals),
  canonical URLs, `hreflang` en/ar alternates on every page pair.
- OpenGraph + Twitter cards (default og:image = brand logo).
- JSON-LD: `Organization` (logo, phone, email, socials, Kuwait address,
  parent org San Ramon General Trading) on every page; `FAQPage` on both FAQ
  pages; `ItemList` of `Product` on `/products/`.
- `robots.txt` (allow all + sitemap URL), `@astrojs/sitemap` with i18n,
  `public/llms.txt` describing the business for generative engines.
- Semantic HTML: one `h1`/page, `header/nav/main/footer/article`, RTL via
  `dir="rtl"` on the AR tree.

## Known gaps / TODOs

1. **Contact form has no backend.** WP used Contact Form 7 + reCAPTCHA.
   Current interim: JS composes a `mailto:` to info@karaktea.com. Replace with
   a form service or serverless endpoint.
2. **Analytics not migrated** (original had GA4 `G-T3ZED4Q23J` + GTM
   `GTM-PTC2HN8` via Site Kit/MonsterInsights). Add tags if the owner wants
   continuity — deliberately left out.
3. **AOS scroll animations** (fade/zoom on scroll) from the original are not
   ported — static layout only. Could add a tiny IntersectionObserver.
4. Slides 2–3 "Shop Now" links point to `https://srkw.co/` (as on the live
   site) — confirm with owner whether all CTAs should target thiafa.com.
5. WP served `.webp` variants of product PNGs; here the PNGs (~1MB each) are
   served directly. Consider converting `public/images/*.png` to webp/avif or
   using `astro:assets` Image for responsive srcsets.
6. Old WP URLs that must keep working after cutover: encoded Arabic slugs are
   preserved 1:1, but set up redirects for `/home/karak-tea/` etc. fragment
   URLs (→ `/`) and `/site-faqs/*` (→ `/faqs/`) at the host if they have
   backlinks.
7. Footer of the original also appears on `/ar/` with identical content —
   verified; no per-page footer variants exist.

## Phase-two ideas

- **CMS**: move page copy, products and distributors (already isolated in
  `src/data/*.ts`) into Astro Content Collections or a headless CMS
  (e.g. Decap/Sanity) so the owner can edit without code.
- **E-commerce**: ordering currently delegates to thiafa.com; a native
  storefront (Shopify Buy Button / Snipcart) is an option if the owner wants
  on-domain checkout.
- **i18n scaling**: current en/ar is hand-mirrored; if more locales come,
  switch to Astro's i18n routing + translation dictionaries.
- **Web3**: evaluated and deemed unnecessary for this brochure/brand site —
  revisit only if the owner wants NFT/loyalty features.

## Resume point for a future session

Everything needed is in this folder: `source-assets/` (originals + manifest),
`src/` (all pages/components/data), and this file. The live WP site remains up
— re-crawl it only to diff for content updates since 2026-07-02. Build must
stay green: `npm run build`.
