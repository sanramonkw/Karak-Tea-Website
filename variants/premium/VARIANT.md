# Karak Tea — PREMIUM variant ("Maison Karak")

A luxury tea-house expression of karaktea.com. Same 12 pages (EN + AR with
original Arabic slugs), same verbatim copy, same assets, same data model,
same SEO head/JSON-LD/sitemap/robots/llms.txt, same functionality (slider,
nav, FAQ accordion, mailto contact flow, external Order Now links) — but a
genuinely different visual system from the master build.

## Design concept

Deep **aubergine/plum atmospheres** derived from the brand purple `#96358e`,
paired with **warm cream/champagne neutrals** instead of plain white. All
pages open with an immersive dark band (full-viewport hero on home, deep plum
page heroes on inner pages) and settle into cream "paper" surfaces. Hairline
rules, an offset champagne picture frame on photography, a recolored
leaf-pattern veil (CSS mask over the original leaves asset) and a serif
display voice give it the "luxury tea house" register. The brand purple,
magenta and light pink are untouched and carry every accent.

## New tokens (extends master — brand tokens unchanged)

| Token | Value | Role |
|---|---|---|
| `--color-plum-950/900/800/700` | `#1c0a1a` → `#572650` | aubergine surface depths |
| `--color-cream` / `--color-cream-soft` | `#f7f1e6` / `#fbf7ef` | warm paper surfaces |
| `--color-champagne` | `#d8bd93` | hairlines, eyebrows, icons on dark |
| `--color-ink` / `--color-ink-soft` | `#2b1526` / `#59404f` | warm text colors on cream |
| `--font-display` | Cormorant Garamond (variable woff2, latin subset, self-hosted in `public/fonts/`) | serif display moments; **falls back to Bahij Janna for Arabic** |

## What changed vs master

- **Header**: fixed transparent bar over the dark heroes → condenses into a
  **dark glass bar** (backdrop-blur) on scroll. Nav links are cream small-caps
  with an animated hairline underline; the external "Order Now" item renders
  as a champagne chip. Mobile nav is a dark-glass overlay with Escape-to-close
  and focus handoff. Skip-to-content link added.
- **Home hero**: full-viewport (`100svh`) slider — layered plum scrims
  (direction flips for RTL), champagne leaf veil with scroll parallax, huge
  Cormorant display title, hairline rule, ghost CTA, line-style pager,
  animated scroll cue. Slide photos 2–3 are deferred until window load.
  Slide crossfade pauses (no auto-advance) under reduced motion. The separate
  mobile copy block from master was removed because the hero content now
  renders at all viewports (same content, once).
- **Split sections → numbered "chapters"**: alternating dark-plum / cream
  editorial bands with an oversized italic serif chapter numeral (CSS
  counter), eyebrow rule, display heading, framed photography (offset
  champagne hairline), refined check-list markers (masked SVG check instead of
  the check-white.png sprite).
- **Inner page heroes**: deep plum radial-gradient bands with leaf veil and
  large serif `h1`.
- **Product cards**: cream cards with hairline borders; hover = lift
  (translateY), soft plum shadow, gradient top rule that draws in, image
  zoom. Product/flag images use `mix-blend-multiply` so baked-in white
  backgrounds melt into the cream surface.
- **Contact**: form sits in a bordered cream panel, sticky on desktop;
  luxe full-width submit; distributor cards restyled with ghost icon circles.
- **FAQ**: hairline editorial accordion (same `<details>` semantics), serif
  "+" that rotates to "×".
- **Footer**: deep plum, centered logo, champagne icon ghosts, serif hashtag,
  hairline rules. The three center-aligned columns (owner request) are kept.
- **Motion**: scroll-reveal via one small IntersectionObserver + transform/
  opacity CSS, leaf-veil parallax via rAF `translate3d` — **everything wrapped
  in `@media (prefers-reduced-motion: no-preference)`** and the JS parallax /
  auto-advance are gated on the same media query. Reveal styles are gated on
  `html.js` so content is fully visible without JavaScript.
- **RTL**: all new CSS uses logical properties (`inset-inline`,
  `padding-inline-start`, `margin-inline`); scrims/gradients flip under
  `[dir="rtl"]`; **letter-spacing is reset to 0 for Arabic** (tracking breaks
  connected script); Cormorant only covers Latin so Arabic display type stays
  in Bahij Janna.

## Jury critique → refinements applied

1. White-background product/flag PNGs read as pasted white rectangles on the
   cream cards → `mix-blend-multiply` on card imagery.
2. Mobile hero copy over the bright milk-tea photo area was borderline AA →
   dedicated full-width vertical scrim below 768px.
3. All three hero JPGs loaded eagerly as CSS backgrounds → slides 2–3 now
   hydrate from `data-bg` after `window.load` (they can only appear via JS).
4. Verified: reveals fire correctly on scroll; reduced-motion renders the
   full layout statically (Playwright `reducedMotion: 'reduce'` capture);
   focus-visible outlines on light and dark surfaces; one `h1` per page.

Contrast checks (WCAG AA): cream on plum-950 ≈ 13:1, champagne on plum-950 ≈
9:1, brand-light on plum-950 ≈ 8.7:1, brand `#96358e` on cream ≈ 5.8:1,
brand-deep on cream ≈ 5.3:1, ink on cream > 12:1.

## How to run

```bash
npm install
npm run build                                   # 12 pages, must stay green
npx astro preview --port 4331 --host 127.0.0.1  # port 4331 belongs to this variant
```

Do not modify the master at `../../karaktea.com/` (its preview runs on 4321).
