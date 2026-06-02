# Karak Tea — Static Brochure Site

Self-contained HTML, CSS, and JavaScript brochure site with **English** and **Arabic** (RTL). Images and fonts are under `assets/` in the repo — **no WordPress and no build scripts required**.

## Pages

- `index.html` — Home
- `products.html` — Product catalog
- `preparation.html` — How to prepare + video
- `vending-machine.html` — Vending solutions
- `faqs.html` — Frequently asked questions
- `contact.html` — Regional contacts + form

## Language switcher

Use **EN** / **ع** in the header. Preference is saved in `localStorage` (`karak-lang`). Arabic sets `dir="rtl"` on the document.

## Run locally

```bash
cd karak-tea
npx serve .
```

Or: `python -m http.server 8765`

## Edit & deploy

1. Edit HTML pages and `js/i18n.js` for copy changes.
2. Product images and paths: `js/assets.js`.
3. Styles: `css/styles.css`.
4. Upload the **entire folder** to any static host.

## Structure

```
karak-tea/
├── assets/           # images & fonts (in repo)
├── css/styles.css
├── js/
│   ├── assets.js     # local asset paths
│   ├── i18n.js
│   ├── main.js
│   └── slider.js
├── partials/         # optional HTML snippets (reference)
└── *.html
```

See `assets/README.md` for media folders.
