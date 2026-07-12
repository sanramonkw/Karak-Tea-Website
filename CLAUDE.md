# karaktea.com — Astro rebuild ("Electric Karak" / Bold, Arabic-first)

## What this is

A ground-up rebuild of **https://karaktea.com** (Karak Tea — a Kuwaiti instant
karak-tea premix brand owned by San Ramon General Trading) as a static Astro
site, migrating the owner off WordPress 7.0 (custom theme "Karak Tea" by
Surajit Kayal, Polylang for i18n, Yoast SEO, Contact Form 7). The owner
authorized pulling all assets and copy from the live site; all page copy is
kept **verbatim** from the original (EN + AR).

Built 2026-07-02. Three alternative designs were explored in `variants/`
(premium, bold, editorial); on **2026-07-12 the owner chose Bold ("Electric
Karak") as the final design** and it was **promoted from `variants/bold/` to
be this root project**. In the same pass, **Arabic became the default
locale** (previously English was at root with Arabic under `/ar/`).

- The **previous master** (pre-promotion: EN-at-root design, no bold styling)
  is preserved on the **`pre-bold-promotion` git branch** — check it out if
  you need to diff against the original build.
- `variants/bold/` **no longer exists as a separate folder** — it *is* this
  root project now. `variants/premium/` and `variants/editorial/` remain as
  alternative designs for comparison, each self-contained with its own
  `VARIANT.md`.

Last verified build: `npm run build` → 12 pages, no errors.

## Tech stack (and why)

- **Astro 5** — static output, zero JS by default, per-page SEO control,
  first-class content sites. Replaces the WP/PHP/jQuery stack.
- **Tailwind CSS 4** via `@tailwindcss/vite` — design tokens live in
  `src/styles/global.css` under `@theme`; a handful of component classes port
  the original theme's bespoke patterns plus the Bold variant's own primitives
  (mesh gradients, diagonal cuts, bento grid, brew timeline — see "Bold design
  system" below).
- **@astrojs/sitemap** — generates `sitemap-index.xml` with ar/en i18n
  annotations (configured in `astro.config.mjs`, `site: 'https://karaktea.com'`,
  `defaultLocale: 'ar'`). The integration auto-pairs only the home pages
  (`/` ↔ `/en/`, same root prefix scheme) — it can't auto-pair the unrelated
  Arabic/English inner-page slugs, so **hreflang for every page lives in the
  HTML `<head>`** via `BaseLayout.astro` (valid per Google; same approach used
  on marshmallows.co).
- No frameworks/islands needed: the only JS is the hero slider crossfade, the
  mobile nav toggle, header scroll-shadow, the interim mailto form handler,
  and a tiny `IntersectionObserver` scroll-reveal script (`data-reveal`,
  reduced-motion safe) — all small inline `<script>`s.

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
`dist/`, Node 20+, the **301 redirect map** for both the pre-existing old WP
URLs *and* the previous EN-root/`/ar/`-prefixed URL scheme, encoded-Arabic-URL
proxy note, analytics re-add, pre-launch checklist and post-launch smoke test.

## i18n / RTL architecture — Arabic is the default locale

Mirrors the pattern used on marshmallows.co:

- **Arabic is the DEFAULT locale, served at the root**: `/`, `/المنتجات/`,
  `/التحضير/`, `/آلات-التوزيع/`, `/أسئلة-مكررة/`, `/اتصل-بنا/` — `dir="rtl"`.
  These keep the **original WordPress Arabic slugs**.
- **English lives under `/en/`**: `/en/`, `/en/products/`,
  `/en/preparation/`, `/en/vending-machine/`, `/en/faqs/`,
  `/en/contact-us/` — `dir="ltr"`.
- `astro.config.mjs`: `sitemap({ i18n: { defaultLocale: 'ar', locales: { ar:
  'ar', en: 'en-US' } } })`.
- No separate i18n routing layer or translation-dictionary file (unlike
  marshmallows.co's `src/i18n/`) — this site is small enough that each
  locale's copy is still hand-written directly into its own page file under
  `src/pages/**` (Arabic files at the top level, English files under
  `src/pages/en/`). Shared UI strings/URLs live in `src/data/site.ts`
  (`NAV_AR` / `NAV_EN`, `SITE.shop.ar/en`, hashtag/name per locale).
- Every page passes `lang="ar"|"en"`, `path="/…/"` (this page's own URL) and
  `alternatePath="/…/"` (the sibling page in the other language) to
  `BaseLayout.astro`, which derives `dir`, canonical, and the three hreflang
  `<link>` tags (`hreflang={lang}`, `hreflang={other lang}` via
  `alternatePath`, and **`hreflang="x-default"` always pointing at the
  Arabic URL** of the pair, even on English pages).
- `Header.astro` / `Footer.astro` take a `lang` prop (`Header`/`Footer`
  default to `'ar'` now) and pick `NAV_AR`/`NAV_EN`, `SITE.nameAr/nameEn`,
  etc. The language-switcher link and `homeHref` in `Header.astro` map
  `ar → '/'` and `en → '/en/'`.
- **When adding a new page pair:** create the Arabic file at
  `src/pages/<arabic-slug>.astro` and the English file at
  `src/pages/en/<english-slug>.astro`; set `path`/`alternatePath` on each to
  point at the other; add both to `NAV_AR`/`NAV_EN` in `src/data/site.ts`.

## Design: Bold ("Electric Karak") — now the master design

**Concept:** an energetic tea-culture brand expression. Deep-plum
gradient-mesh fields (derived from the brand purples), oversized Bahij Janna
display type, a giant `#ForEveryMoment` typographic system (hero watermark,
marquee band, footer moment), bento product grid, asymmetric overlapping
story sections with diagonal clip-path transitions, and scroll-triggered
reveals. Brand colors `#96358e / #b91877 / #e7b2d6` preserved; no extra font
added (Bahij Janna Bold covers Arabic display parity at giant sizes).

### What changed vs. the original (pre-Bold) design

- **Header** → floating glass pill nav (backdrop-blur, rounded-full), active
  page shown as a gradient pill, "Order Now" as a filled pill CTA; mobile menu
  is a full-screen dark mesh overlay with giant links. Scroll listener only
  deepens the pill shadow.
- **Home hero** → replaced the full-bleed crossfade slider with a gradient
  "electric field": giant gradient-clipped `Karak Tea` h1, verbatim slider
  copy, outline-type hashtag watermark, and the 3 photos crossfading inside a
  tilted rounded deck. All three per-slide CTA hrefs preserved (visible CTA
  swaps with the active slide; pill-shaped pagers; autoplay disabled under
  `prefers-reduced-motion`). The separate mobile copy block was merged into
  the responsive hero (content shown once, still verbatim).
- **Home sections** → `SplitSection` rebuilt as asymmetric "story" sections:
  alternating light-mesh / dark-mesh (diagonal `clip-path` edges), giant
  decorative index numerals 01–04, tilted overlapping image cards, gradient
  title swash, gradient-chip check bullets (brand check icon kept). A
  decorative `HashtagBand` marquee (transform-only, frozen under
  reduced-motion, `aria-hidden`) sits between sections.
- **Page hero** (inner pages) → full-bleed dark mesh banner, h1 at
  `clamp(3rem,8vw,6.5rem)`, leaves-pattern texture veil, diagonal bottom cut.
- **Products** → bento grid (`grid-auto-flow: dense`): 2×2 feature tile +
  three wide tiles among 1×1 cards; hover = lift + micro-tilt + gradient-shift
  + image zoom + "Shop Now ↗" hint (always visible on touch/reduced-motion).
- **Preparation** → animated brew timeline: central gradient line, numbered
  nodes (decorative), steps image and YouTube embed in gradient media frames
  on alternating sides, scroll reveals.
- **FAQs** → native `<details>` accordion kept, restyled as rounded cards
  with CSS-counter number chips and a rotating "+" indicator.
- **Contact** → mailto form unchanged functionally, now in a sticky dark
  gradient panel with white underline inputs; distributor cards rounded with
  hover lift (all links/flags/phones unchanged).
- **Footer** → dark mesh field with a giant gradient hashtag headline, brand
  seal, glass social circles, same contact links + centered-rights row.
- **Global** → skip link, sticky "Order Now" pill (bottom inline-end, all
  pages, lang-aware, same thiafa.com targets — logical properties keep it on
  the correct physical side per RTL/LTR), tiny IntersectionObserver reveal
  script in `BaseLayout` (reduced-motion + no-JS safe), `:focus-visible` ring.

### Tokens / components

- Tokens in `src/styles/global.css` `@theme`: brand palette unchanged (see
  "Colors" table below); added `--color-plum #2a0b28`, `--color-plum-soft
  #45123f`, `--color-cream #fdf7fb`.
- CSS primitives: `.mesh-dark` / `.mesh-light`, `.cut-bottom` / `.cut-both`,
  `.text-electric(-bright)`, `.text-outline`, `.display-hero` /
  `.display-title`, `.btn-glow` / `.btn-ghost`, `.sticky-cta`, `[data-reveal]`,
  `.hero-deck`, `.hashtag-band`, `.story-index` / `.story-img`, `.bento-card`,
  `.brew-timeline` / `.brew-node`, `.media-frame`, `.contact-panel`.
- Components: `Header`, `Footer`, `HeroSlider`, `SplitSection` (+`index`
  prop), `PageHero`, `ProductCard` (+`class` prop), `HashtagBand`;
  `BaseLayout` (head/SEO logic — canonical/hreflang/OG/JSON-LD/skip-link/
  reveal script). RTL via logical properties + mirrored tilts/marquee — this
  matters more now than it did pre-promotion since RTL is the **default**
  rendering path, not a secondary one.

### Hard-constraint compliance (carried over from the variant build)

Verbatim copy EN+AR, same assets, same Arabic slugs, same
titles/descriptions/canonicals/hreflang/JSON-LD (Organization, FAQPage,
ItemList)/sitemap/robots/llms.txt, same functionality (nav, FAQ accordion,
contact mailto, Order Now links incl. srkw.co slide CTAs). One h1/page, WCAG
AA (white on `#96358e` ≈ 6.6:1, on `#b91877` ≈ 6.1:1, `#e7b2d6` on plum ≈
5.6:1), transform/opacity animations only, all gated by
`prefers-reduced-motion`, lazy images, JS = a handful of tiny inline scripts.

### Jury pass (self-critique) + refinements made during the variant build

- Found: screenshot audit initially showed reveals not firing — cause was the
  audit script fighting `scroll-behavior: smooth`; verified IO works on real
  scroll; added `html.no-js` fallback so content is never hidden without JS.
  (Still true post-promotion: a full-page screenshot taken without first
  scrolling through the page will show blank story sections — scroll through
  first, or force `.is-in` before capturing.)
- Found: mobile hero deck clipped by the diagonal cut → increased mobile hero
  bottom padding (`pb-40`).
- Found: outline marquee text too faint → stroke raised to 0.55 alpha on
  dark, dedicated `#96358e @ 0.45` stroke on the white band.
- Verified: AR home mirrors fully (deck/tilt/marquee direction, sticky CTA
  inline-end), bento dense-packing leaves no holes, FAQ/contact/vending OK
  desktop + mobile — this verification is now load-bearing since AR is the
  default rendering path.

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
| `--color-plum` | `#2a0b28` | Bold variant: dark mesh field base |
| `--color-plum-soft` | `#45123f` | Bold variant: dark mesh gradient stop |
| `--color-cream` | `#fdf7fb` | Bold variant: light mesh field base |
| body text | `#000` on `#fff` | body (pre-Bold pages); Bold uses mesh fields, see above |

### Fonts (self-hosted in `public/fonts/`, pulled from the WP theme)

| Role | Family | File | Original alias |
|---|---|---|---|
| Headings (h1–h6, nav) | Bahij Janna Bold | `Bahij-Janna-Bold.ttf` | `'Font-Bold'` |
| Medium | Bahij Janna Regular | `Bahij-Janna-Regular.ttf` | `'Font-Medium'` |
| Body | Helvetica Arabic | `helvetica-arabic.ttf` | `'Font-Regular'` |

Note: the WP head also linked Google Fonts **Montserrat 400/700**, but the
theme CSS never references it — intentionally not loaded here.

### Color/layout fidelity pass (2026-07-02, pre-Bold baseline)

A Playwright screenshot + getComputedStyle diff against the live site
(1440x900, EN+AR home, products, contact) verified/corrected a set of
pixel-level details (nav styling, header shrink behavior, split-section
grid, footer alignment, etc.) against the original WordPress theme. That
pass targeted the **original (non-Bold) design**; the Bold variant
deliberately supersedes most of that visual language (see "Design: Bold" above)
while preserving the underlying brand tokens, copy, and functionality it
verified. Refer to the `pre-bold-promotion` branch's CLAUDE.md if you need the
full original fidelity notes.

## Page inventory

### Rebuilt (12/12 real pages) — Arabic at root (default), English under `/en/`

| Route (AR, default) | Route (EN) | Source (WordPress) | Notes |
|---|---|---|---|
| `/` | `/en/` | Home | slider/hero + 4 story sections (Karak Tea / Product / Our Journey / About Us) |
| `/المنتجات/` | `/en/products/` | Products | 14 product cards → thiafa.com shop links, bento grid |
| `/التحضير/` | `/en/preparation/` | Preparation | steps image + YouTube embed (`0DdPepASq1w`), brew timeline |
| `/آلات-التوزيع/` | `/en/vending-machine/` | Vending Machine | linked hero image → thiafa vending tag |
| `/أسئلة-مكررة/` | `/en/faqs/` | FAQs | 7 Q&As, `<details>` accordion + FAQPage JSON-LD |
| `/اتصل-بنا/` | `/en/contact-us/` | Contact us | form + 10 distributor cards |

File locations: Arabic pages live at `src/pages/<arabic-slug>.astro` (top
level); English pages live at `src/pages/en/<english-slug>.astro`.

The WP sitemap also listed CPT/fragment URLs (`/home/...` sections,
`/site-faqs/...`, `/site-products/...`, `/site-footer/...`, `/site-contact/...`,
`/slides/...`). These are **WordPress internal content fragments**, not real
pages — their content is embedded in the pages above. No standalone pages were
skipped. See `DEPLOYMENT.md` for where these (and the pre-promotion URLs)
should 301 to now.

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
  mapping is visible in `src/pages/en/products.astro` vs the manifest.
- Favicon: `public/favicon.png` (= `Karak_New.png`, same as original).

> Migration gotcha: the origin (Kinsta behind Cloudflare) occasionally served
> a *different site's* response for karaktea.com URLs (vhost mix-up). The
> asset downloader verified magic bytes and retried; if you fetch more assets,
> verify content, don't trust a single response.

## SEO / GEO implemented

- Per-page `<title>` + meta description (titles match the WP/Yoast originals),
  canonical URLs reflecting the new AR-root/`/en/`-prefixed scheme,
  `hreflang` `ar` / `en` / **`x-default` (always → the Arabic URL)** on every
  page pair.
- OpenGraph (`og:locale` / `og:locale:alternate` per page) + Twitter cards
  (default og:image = brand logo).
- JSON-LD: `Organization` (logo, phone, email, socials, Kuwait address,
  parent org San Ramon General Trading) on every page; `FAQPage`
  (`inLanguage` set per locale) on both FAQ pages; `ItemList` of `Product` on
  the products pages.
- `robots.txt` (allow all + sitemap URL), `@astrojs/sitemap` with i18n
  (`defaultLocale: 'ar'`), `public/llms.txt` describing the business for
  generative engines with the new AR-root/`/en/` URLs.
- Semantic HTML: one `h1`/page, `header/nav/main/footer/article`, RTL via
  `dir="rtl"` on the AR tree (now the default `dir` at root, not a secondary
  variant).

## Known gaps / TODOs

1. **Contact form has no backend.** WP used Contact Form 7 + reCAPTCHA.
   Current interim: JS composes a `mailto:` to info@karaktea.com. Replace with
   a form service or serverless endpoint.
2. **Analytics not migrated** (original had GA4 `G-T3ZED4Q23J` + GTM
   `GTM-PTC2HN8` via Site Kit/MonsterInsights). Add tags if the owner wants
   continuity — deliberately left out.
3. Slides 2–3 "Shop Now" links point to `https://srkw.co/` (as on the live
   site) — confirm with owner whether all CTAs should target thiafa.com.
4. WP served `.webp` variants of product PNGs; here the PNGs (~1MB each) are
   served directly. Consider converting `public/images/*.png` to webp/avif or
   using `astro:assets` Image for responsive srcsets.
5. **Old URLs that must keep working after this cutover** — see
   `DEPLOYMENT.md`'s 301 map: (a) pre-existing WP fragment URLs
   (`/home/*`, `/site-faqs/*`, etc.), now retargeted to `/en/...` since
   English moved off the root; (b) this rebuild's *own* previous URL scheme
   (EN at root, AR under `/ar/`) from before the 2026-07-12 Bold
   promotion/Arabic-first cutover.
6. Footer appears identically on every page/locale — verified; no per-page
   footer variants exist.

## Phase-two ideas

- **CMS**: move page copy, products and distributors (already isolated in
  `src/data/*.ts`) into Astro Content Collections or a headless CMS
  (e.g. Decap/Sanity) so the owner can edit without code.
- **E-commerce**: ordering currently delegates to thiafa.com; a native
  storefront (Shopify Buy Button / Snipcart) is an option if the owner wants
  on-domain checkout.
- **i18n scaling**: current ar/en is hand-mirrored; if more locales come,
  consider a routes-map + translation-dictionary layer like
  marshmallows.co's `src/i18n/utils.ts` (`pathFor()` / `alternatePath()`).
- **Web3**: evaluated and deemed unnecessary for this brochure/brand site —
  revisit only if the owner wants NFT/loyalty features.

## Resume point for a future session

Everything needed is in this folder: `source-assets/` (originals + manifest),
`src/` (all pages/components/data — Bold design, Arabic-first routing), and
this file. `variants/premium/` and `variants/editorial/` hold the two
remaining alternative designs. The `pre-bold-promotion` git branch holds a
full snapshot of the project **before** the Bold promotion and Arabic-first
flip, in case you need to diff against it. The live WP site remains up —
re-crawl it only to diff for content updates since 2026-07-02. Build must
stay green: `npm run build` (12 pages).
