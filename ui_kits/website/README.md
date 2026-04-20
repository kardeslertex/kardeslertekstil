# Marketing Website — UI Kit

Interactive recreation of a Kardeşler Tekstil marketing site, designed against the tokens in `../../colors_and_type.css`.

## Files
- `index.html` — interactive click-thru: home → products → references → about → contact
- `Primitives.jsx` — `Logo`, `Monogram`, `Icon` (inline Lucide), `Button`
- `Chrome.jsx` — `Header`, `Footer`, `WhatsAppFAB`
- `Hero.jsx` — marketing hero with stats + hazard-stripe accent
- `Sections.jsx` — `ProductGrid`, `ProductCard`, `AboutStrip`, `ReferencesMarquee`, `ContactBlock`, `ContactForm`, `Field`
- `Pages.jsx` — `ProductsPage`, `ReferencesPage`, `AboutPage`, `ContactPage`, `PageHeader`

## Screens
1. **Home** — hero, 6-product grid, about strip, references marquee, contact
2. **Ürünlerimiz** — full product catalog grid + custom-production CTA
3. **Referanslarımız** — 12-logo client grid
4. **Hakkımızda** — long-form about + stat strip
5. **İletişim** — split contact (info + form → success state)

## Notes
- Product/hero images are styled placeholders. Real URLs in `../../assets/remote_images.txt`.
- Icons are inline Lucide paths, no CDN dependency.
- Route state persists in localStorage.
