# Karak Tea — EDITORIAL MINIMAL variant

A magazine-inspired re-expression of karaktea.com: **"a tea culture journal."**
Same 12 pages, same verbatim copy (EN + AR, original Arabic slugs), same
assets, data model, SEO head and functionality as the master at
`../../karaktea.com/` — but a genuinely different design language.

## Concept

Calm neutral field — warm paper ivory (`#f7f3ec`) and ink (`#1b161b`) — with
the brand purples (`#96358e` / `#b91877` / `#e7b2d6`, values unchanged) used
only as precise accents: section numerals, accent rules, links, focus rings,
selection. Typography and photography carry everything: huge quiet serif
headlines, numbered story sections (01 Karak Tea / 02 Product / 03 Journey /
04 About), hairline rules, small-caps labels, photographs mounted as
captioned plates, and a colophon-style footer.

## Tokens & fonts

- Brand colors preserved verbatim in `src/styles/global.css` `@theme`
  (`--color-brand*`), plus new neutrals: `--color-paper`, `--color-paper-deep`,
  `--color-ink`, `--color-ink-soft`, `--color-hairline`.
- Brand fonts kept: Bahij Janna (Arabic display, bold) + Helvetica Arabic
  (body). **One added complementary face**: *Newsreader* — editorial serif,
  self-hosted woff2 (`public/fonts/Newsreader-Var.woff2` roman variable +
  `Newsreader-Italic.woff2`), no CDNs. Stack `--font-display: "Newsreader",
  "Bahij Janna", …` so Arabic headlines fall through to the brand face.

## Changes vs master (component by component)

- **Header** → static editorial masthead: small logo, understated small-caps
  text-link nav (active page = purple underline), hairline bottom rule,
  "Order Now" as `.link-cta` with ↗ (↖ in RTL). Scroll-shrink JS removed;
  mobile overlay nav kept (now a full-page numbered paper index).
- **HeroSlider** → zero-JS magazine cover (same props API): `#ForEveryMoment`
  eyebrow, clamp(4–9.5rem) headline, serif standfirst (slide 1 text verbatim),
  full-bleed cover photo with quiet caption; slides 2–3 recomposed as a
  captioned diptych, each keeping its own Shop Now link (thiafa / srkw.co).
  The carousel JS, crossfade and pager dots are gone.
- **SplitSection** → numbered features on an asymmetric 12-col grid
  (variant 1: photo cols 1–7 / copy 9–12; variant 2: copy 2–5 / photo 7–12),
  CSS-counter numerals (`.features`/`.feature`), accent rule, plate-mounted
  images with alt-text captions. Copy precedes the figure in DOM (a11y +
  mobile flow). `.checked-list` restyled as hairline index list with purple
  em-rule markers (page markup untouched).
- **PageHero** → `.page-opener`: accent rule + start-aligned clamp(3–5.5rem)
  serif h1 over hairline.
- **ProductCard / products pages** → hairline catalogue grid (`.plates`):
  running numerals via CSS counter, white-matted images, small-caps names.
- **Contact** → 12-col split (form 4 / directory 8), ink submit button
  (purple on hover), distributors as hairline directory cells.
- **FAQ** → numbered question list (CSS counter), serif questions,
  `<details>/<summary>` accordion + FAQPage JSON-LD kept.
- **Footer** → colophon: 2px ink rule, centered stack (mark, italic hashtag,
  phone/email, bare-glyph socials), small-caps rights line, labeled Top link.
- **Preparation / Vending** → plate-mounted steps image, video and linked
  vending image (links unchanged).

## Hard-constraint compliance

- 12/12 pages build; URLs/slugs, titles, descriptions, canonicals, hreflang,
  OG/Twitter, Organization/FAQPage/ItemList JSON-LD, sitemap, robots.txt,
  llms.txt all unchanged. Content verbatim; only presentational chrome added
  (numerals, captions from existing strings).
- JS: only the mobile nav toggle and the contact mailto composer (both from
  master). Hero JS removed. Images lazy except the cover (`fetchpriority`).
- Motion: color/underline transitions only, gated by a global
  `prefers-reduced-motion` reset.
- RTL: logical properties/utilities throughout (`inset-inline-start`,
  `padding-inline`, `ms/me`, `border-s`, grid placement mirrors with `dir`);
  Arabic overrides drop letterspacing/italics and switch display type to
  Bahij Janna Bold. Verified on `/ar/` (grid, numerals, rules all mirror).
- A11y: one h1/page, global `:focus-visible` ring, `aria-current` nav,
  aria-labelled icon links, AA contrast (purple on paper ≈ 6.0:1,
  ink-soft ≈ 5.9:1).

## Jury critique → refinements

1. **DOM order** — figure preceded the h2 inside features (screen readers and
   mobile got the photo before the headline). *Fixed*: copy first in DOM,
   desktop asymmetry via explicit `col-start/row-start` placement.
2. **Contrast audit** — purple + ink-soft on paper checked ≈ 5.9–6.0:1, AA
   pass at all used sizes; no change needed.
3. **Arabic typography** — wide tracking and italic serifs don't suit joined
   script; RTL overrides zero the tracking and de-italicize captions/numerals.
4. **Lazy-load note** — the blank "About Us" photo in an early full-page
   screenshot was a capture artifact (loading=lazy below the fold), not a
   site bug; verified the image renders.

## Run

```bash
npm install
npm run build          # must stay green: 12 pages
npx astro preview --port 4333 --host 127.0.0.1   # port 4333 belongs to this variant
```
