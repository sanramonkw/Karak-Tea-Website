# Karak Tea — BOLD INNOVATION variant ("Electric Karak")

Design variant of the master rebuild at `../../karaktea.com/` (do not modify
the master). Same 12 pages, verbatim EN+AR content, same slugs/SEO/data —
a completely different design language.

## Concept

**"Electric Karak"** — an energetic tea-culture brand expression. Deep-plum
gradient-mesh fields (derived from the brand purples), oversized Bahij Janna
display type, a giant `#ForEveryMoment` typographic system (hero watermark,
marquee band, footer moment), bento product grid, asymmetric overlapping
story sections with diagonal clip-path transitions, and scroll-triggered
reveals. Brand colors `#96358e / #b91877 / #e7b2d6` preserved; no extra font
added (Bahij Janna Bold covers Arabic display parity at giant sizes).

## Changes vs master

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
  title swash, gradient-chip check bullets (brand check icon kept). New
  decorative `HashtagBand` marquee (transform-only, frozen under
  reduced-motion, `aria-hidden`).
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
  pages, lang-aware, same thiafa.com targets), tiny IntersectionObserver
  reveal script in `BaseLayout` (reduced-motion + no-JS safe), `:focus-visible`
  ring.

## Tokens / components

- Tokens in `src/styles/global.css` `@theme`: brand palette unchanged; added
  `--color-plum #2a0b28`, `--color-plum-soft #45123f`, `--color-cream #fdf7fb`.
- New CSS primitives: `.mesh-dark` / `.mesh-light`, `.cut-bottom` /
  `.cut-both`, `.text-electric(-bright)`, `.text-outline`, `.display-hero` /
  `.display-title`, `.btn-glow` / `.btn-ghost`, `.sticky-cta`, `[data-reveal]`,
  `.hero-deck`, `.hashtag-band`, `.story-index` / `.story-img`, `.bento-card`,
  `.brew-timeline` / `.brew-node`, `.media-frame`, `.contact-panel`.
- Components touched: `Header`, `Footer`, `HeroSlider`, `SplitSection`
  (+`index` prop), `PageHero`, `ProductCard` (+`class` prop), new
  `HashtagBand`; `BaseLayout` (head/SEO untouched except a 1-line no-js
  class remover). RTL via logical properties + mirrored tilts/marquee.

## Hard-constraint compliance

Verbatim copy EN+AR, same assets, same URLs/Arabic slugs, same titles/
descriptions/canonicals/hreflang/JSON-LD (Organization, FAQPage, ItemList)/
sitemap/robots/llms.txt, same functionality (nav, FAQ accordion, contact
mailto, Order Now links incl. srkw.co slide CTAs). One h1/page, WCAG AA
(white on `#96358e` ≈ 6.6:1, on `#b91877` ≈ 6.1:1, `#e7b2d6` on plum ≈ 5.6:1),
transform/opacity animations only, all gated by `prefers-reduced-motion`,
lazy images, JS = 4 tiny inline scripts.

## Jury pass (self-critique) + refinements

- Found: screenshot audit initially showed reveals not firing — cause was the
  audit script fighting `scroll-behavior: smooth`; verified IO works on real
  scroll; added `html.no-js` fallback so content is never hidden without JS.
- Found: mobile hero deck clipped by the diagonal cut → increased mobile hero
  bottom padding (`pb-40`).
- Found: outline marquee text too faint → stroke raised to 0.55 alpha on
  dark, dedicated `#96358e @ 0.45` stroke on the white band.
- Verified: AR home mirrors fully (deck/tilt/marquee direction, sticky CTA
  inline-end), bento dense-packing leaves no holes, FAQ/contact/vending OK
  desktop + mobile.

## Run

```bash
cd /home/diywan/projects/informative-websites-clone/variants/karaktea-bold
npm install
npm run build                                   # must stay green: 12 pages
npx astro preview --port 4332 --host 127.0.0.1  # port 4332 belongs to this variant
```

Final full-page homepage screenshot:
`/tmp/claude-1001/-home-diywan-projects-informative-websites-clone/3f1d5f6d-99c1-4d7b-af7e-8b957d84d8ba/scratchpad/variant-karaktea-bold.png`
