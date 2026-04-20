# Kardeşler Tekstil — Design System

> İş kıyafetlerinde profesyonel üretim · 1982'den bu yana

This is the design system for **Kardeşler Tekstil A.Ş.**, a Turkish manufacturer of corporate workwear, promotional textiles, and custom-design uniforms based in Pendik, İstanbul.

---

## ⚠️ Important context for anyone reading this

The live site (`kardeslertekstil.com.tr`) is a minimal WordPress install with **no formal brand system** — no defined palette, type scale, logo file, tone guide, or component library. The directory you are looking at is therefore a **proposed design direction** informed by:

- The company's self-description (work uniforms, since 1982, corporate/B2B)
- The actual screens on the live site
- The visual vocabulary of Turkish industrial / manufacturing brands
- Standard conventions for B2B workwear and promotional textile suppliers

**Nothing here was extracted from an existing brand book.** Treat it as a starting proposal for iteration with the client.

### Sources

| Source | URL / path | Status |
|---|---|---|
| Live website | <https://kardeslertekstil.com.tr/> | Fetched (text content only) |
| Products page | <https://kardeslertekstil.com.tr/urunlerimiz/> | Fetched |
| About page | <https://kardeslertekstil.com.tr/about/> | Fetched |
| Product photos (WhatsApp-Image-…) | `kardeslertekstil.com.tr/wp-content/uploads/2026/04/…` | Referenced by URL — could not be copied into the sandbox (cross-origin fetch blocked). Live URLs are preserved in `assets/remote_images.txt` so they can be downloaded manually. |
| Logo file | — | **Does not exist** on the live site. I designed a wordmark lockup for this system; flagged as a proposal. |
| Figma / codebase | — | Not provided. |

---

## Company context

- **Founded:** 1982
- **Business:** Custom-designed, sampled, and bulk-produced corporate workwear and promotional textiles
- **Customers:** Kurumsal firmalar (corporate clients) — B2B only
- **Product categories:** T-shirts, polo (lakost) shirts, work coveralls (tulum), fleece & sweatshirts, aprons (önlük), custom-designed items
- **Address:** Fevzi Çakmak, Manolya Sk. 11-12/A, 34899 Pendik / İstanbul
- **Contact:** WhatsApp 0216 396 19 88 · kardesler@kardeslertekstil.com.tr
- **Primary channel:** WhatsApp — the existing site funnels every CTA into `wa.me/902163963694`.

## What's in this directory

```
/
├── README.md                ← you are here
├── SKILL.md                 ← Claude skill entry point
├── colors_and_type.css      ← design tokens (CSS vars)
├── fonts/                   ← webfonts (Google Fonts imports documented)
├── assets/                  ← logos, icons, remote image index
├── preview/                 ← design-system cards (Type, Colors, Spacing, Components, Brand)
└── ui_kits/
    └── website/             ← marketing website UI kit (JSX components + index.html)
```

See the **Index** section at the bottom for a full file-by-file manifest.

---

## CONTENT FUNDAMENTALS

### Language
**Turkish first.** Every customer-facing word on the live site is Turkish; English is not used. Copy for this brand must be written in Turkish, then optionally translated.

### Voice and tone
The existing copy is **short, declarative, and proud**. Sentences are often fragments. The brand talks about itself in the first-person plural ("biz" / "sunuyoruz" / "yaşıyoruz") — the voice of an established family business, not a startup and not a faceless corporation.

| Dimension | Direction |
|---|---|
| Pronouns | "Biz" / "sizin firmanıza" — we serve you. Never "ben". |
| Formality | **Siz** form throughout. Never "sen". |
| Emoji | **Never.** This is industrial B2B; emoji would undermine credibility. |
| Exclamation marks | Rare. Calm confidence over excitement. |
| Numbers | Spelled out as years/counts when they matter ("1982'den günümüze"). Spaces before punctuation on the live site ("Tekstil  ,") — treat as a typo, not a style. |
| Casing for display | **ALL CAPS** for headlines and the wordmark, Title Case for subheads, sentence case for body. |
| Sentence rhythm | Short. Punchy. Then one longer sentence that explains what we actually do. |

### Example copy (pulled from or modeled on the live site)

**Hero headline (on-brand):**
> İŞ KIYAFETLERİNDE PROFESYONEL ÜRETİM
> 1982'DEN GÜNÜMÜZE İŞ KIYAFETİ ÜRETİMİ

**Supporting paragraph (on-brand):**
> Kardeşler Tekstil, 1982 yılından bu yana iş kıyafetleri üretiminde faaliyet göstermektedir. Kurumsal firmalara özel tasarım, numune ve toplu üretim hizmetleri sunarak, tekstil içerikli promosyon ürünlerinde akla gelen ilk firmalardan biri olmanın gururunu yaşıyoruz.

**CTAs (keep utilitarian, WhatsApp-forward):**
- `Whatsapp'tan Teklif Al` ✅
- `Numune Talep Et` ✅
- `Ürünlerimizi İnceleyin` ✅
- ~~"Dünyayı değiştiren iş kıyafetleri"~~ ❌ (too startup, not this brand)

### What NOT to write
- No superlatives without backing ("en iyi", "dünyanın lideri") — Kardeşler's credibility is *duration* (since 1982), not hype.
- No English sprinkled in ("premium quality", "best in class").
- No rhetorical questions as headlines ("Looking for the perfect uniform?").
- No emoji. No hashtags outside social captions.

---

## VISUAL FOUNDATIONS

### Design attitude
**Industrial, warm, utilitarian, proud.** Think: a well-run Turkish workshop with a loyal corporate roster, not a hip D2C apparel brand. The visual language should feel like it belongs on a factory floor, on a delivery truck, *and* on a tender document for a national bank — all three at once.

### Color
One deep, saturated primary that reads well on fabric labels, a workshop-orange accent for energy and safety-wear association, and a disciplined neutral ramp. No pastels, no bluish-purple gradients, no glass-morphism.

- **Primary — Workshop Navy** `#0E2A44` — serious, stable, dependable. The "1982" color.
- **Accent — Hi-Vis Orange** `#E6662A` — references safety wear and Turkish cultural warmth. Used sparingly — CTAs, underlines, small accents.
- **Support — Bolt Red** `#B92133` — from the Turkish flag; used only for badges / alerts / the dot on the "i" in the wordmark.
- **Cream** `#F3EEE4` — paper / canvas background. Softer than pure white; evokes cotton and kraft paper.
- **Ink** `#111418` — body text.
- **Steel 100–900** — a neutral ramp for UI chrome.

Full tokens in `colors_and_type.css`.

### Typography
Two families:

1. **Display / headlines — Archivo Black** (Google Fonts). Condensed-ish grotesque with heavy weight; feels stamped, industrial, confident. Used for hero headlines in ALL CAPS and for the wordmark.
2. **Body / UI — Inter Tight** (Google Fonts). Neutral, legible, tight metrics. Used for paragraphs, buttons, forms, navigation.

**⚠️ Font substitution flag:** No existing font files were provided. Archivo Black and Inter Tight are my proposed matches — they fit the industrial/utilitarian direction and are free on Google Fonts. **Please confirm or provide alternatives.**

### Backgrounds
- **Cream** (`--bg-cream`) is the default surface — not white. Pure white feels sterile for this brand.
- **Navy** is used for dark hero / footer bands, full-bleed.
- **Photography over color panels** — product shots sit on a navy or cream panel; never gradient.
- **No gradient backgrounds.** No soft radial glows. No mesh gradients.
- **A subtle repeating diagonal stripe pattern** (optional, sparing) evokes warehouse hazard tape — used on section dividers or empty states.

### Imagery style
- Product shots on plain backgrounds (hanging garments, folded stacks, on-body photos of workers).
- Photos run **warm** — slight beige/orange cast, medium contrast. Never cold/blue.
- No overlay filters. No duotones. No Unsplash-style moody lifestyle shots.
- When photos aren't available: a navy or cream panel with the wordmark and a short label.

### Layout
- **Generous horizontal rules and block dividers** — section breaks are marked by thick 2–4px orange or navy rules, not shadows.
- **Left-aligned, hard grid.** No artsy asymmetry.
- **Max content width 1280px** on desktop marketing.
- **Fixed header** on marketing site — navy band, 72px tall.
- **Spacing scale** 4-based: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.

### Corner radii
Small and restrained. This is manufacturing, not a fintech app.
- `--radius-sm: 2px` (buttons, inputs)
- `--radius-md: 4px` (cards)
- `--radius-lg: 8px` (modal, image wells)
- **No pill buttons.** No fully-rounded avatars beyond circles that are genuinely circular.

### Cards
- Cream or white background, 1px steel-200 border, 4px radius, **no shadow by default.**
- Shadow only on hover (see below) and only lightly: `0 2px 8px rgba(14, 42, 68, 0.08)`.
- No colored-left-border-accent cards. No gradient cards.

### Shadows
Used sparingly. Two levels only:
- `--shadow-1: 0 1px 2px rgba(17, 20, 24, 0.06)` — subtle resting state.
- `--shadow-2: 0 4px 16px rgba(14, 42, 68, 0.12)` — hover/raised.
- No inner shadows. No neon glows.

### Borders
1px steel-200 is the default. 2px navy or orange on focused/active states. Section dividers get a 2px rule, not a thin hair.

### Hover states
- Buttons: **background shifts one shade darker** (navy → navy-800, orange → orange-600). No size changes.
- Cards: shadow appears, border darkens to steel-300. Do not lift or scale.
- Links: orange underline slides in left→right over 150ms.

### Press / active states
- Buttons: background drops another shade darker AND translates 1px down (`translateY(1px)`). Mimics a physical button press — fitting for an industrial brand.
- No scale-down. No haptic-style wobbles.

### Animation
- **Short and functional.** 150–200ms. Easing `cubic-bezier(0.2, 0, 0, 1)` (standard easeOutExpo-ish).
- No bounces, no elastic easing, no parallax.
- Page loads are static — no entrance animations on hero.

### Transparency / blur
- **Never** on product imagery. Sheets of navy color work better than frosted glass for this brand.
- A single permitted use: the fixed header can go from opaque → `backdrop-filter: blur(12px)` with 85% navy opacity when scrolled, on long pages. That's it.

### Protection gradients
When text sits over a photo, prefer a **solid 2px navy rule above the text + solid navy panel behind it** rather than a gradient fade. If a gradient is truly needed, it is vertical, solid-navy-to-transparent, no softness.

### Layout rules (fixed elements)
- Fixed header (navy, 72px) on marketing.
- Sticky WhatsApp FAB in bottom-right on mobile (56px circular, accent orange, white icon).
- No fixed bottom bars, no cookie banners designed into the system.

### Dark mode
Not scoped. The system is designed light-first on cream. If dark is later needed, it inverts to deep navy ground with cream type — tokens are already set up to allow this.

---

## ICONOGRAPHY

### Approach
This brand did not have an icon set of its own. I chose **[Lucide](https://lucide.dev)** as the substitute — it's open-source, has a consistent 2px stroke weight, feels industrial/utilitarian rather than rounded/friendly, and matches the "functional, disciplined" tone of the rest of the system.

**⚠️ Substitution flag:** Lucide is a proposal. If the client has a preferred icon system (e.g. Material, Phosphor, or a custom set), swap it in.

### Rules
- **Stroke width 2px**, never filled icons mixed with stroked.
- **24×24 default size**, scale to 16 and 32 only.
- Color: inherit `currentColor`. In navy-on-cream contexts that's navy; in cream-on-navy it's cream.
- **Never emoji** anywhere in UI. Not in buttons, not in empty states, not in marketing.
- **Unicode symbols** (✓, →, ×, ·) are fine for simple inline marks but prefer proper Lucide icons for anything stateful.

### Specific icons used in this kit
- `MessageCircle` — WhatsApp CTAs (see `LucideWhatsApp.jsx` for the official WhatsApp green overlay)
- `Mail` — email contact
- `MapPin` — address
- `Phone` — phone number
- `ArrowRight` — CTA arrow
- `Check` — product feature bullets
- `Package` — product categories
- `Factory` — "since 1982" / manufacturing credibility
- `Menu` / `X` — mobile nav

Loaded via CDN in `ui_kits/website/index.html` using the `lucide` UMD bundle — no build step required.

### Logo / wordmark
**There was no existing logo.** I designed a wordmark lockup (`assets/logo-wordmark.svg`) using the display typeface in all caps, with a dot over the "İ" rendered in Bolt Red. A monogram mark (`assets/logo-monogram.svg`) using a stylized "K" inside a navy square is provided for small-surface use (favicon, avatar).

Both are **proposals**. Happy to swap in a real logo when one is provided.

---

## Index — file-by-file manifest

### Root
- `README.md` — this file
- `SKILL.md` — skill entry point for Claude / Claude Code
- `colors_and_type.css` — all CSS design tokens (colors, fonts, spacing, shadows, radii)

### `fonts/`
- `README.md` — explains Google Fonts imports (Archivo Black, Inter Tight) and how to swap

### `assets/`
- `logo-wordmark.svg` — primary horizontal wordmark lockup (navy + bolt red dot)
- `logo-wordmark-cream.svg` — cream version for dark backgrounds
- `logo-monogram.svg` — "K" monogram for small surfaces / favicon
- `pattern-hazard-stripes.svg` — diagonal-stripe pattern, navy/cream
- `remote_images.txt` — URLs of the live-site product photos (sandbox could not download them)

### `preview/` — design-system cards
Each card targets ~700×150 (some taller). Registered via `register_assets`.

- `preview/type-display.html` — Archivo Black specimen
- `preview/type-body.html` — Inter Tight specimen
- `preview/type-scale.html` — H1–H6 + body + caption scale
- `preview/colors-primary.html` — navy, orange, red swatches
- `preview/colors-neutral.html` — cream, steel ramp
- `preview/colors-semantic.html` — semantic token examples
- `preview/spacing-scale.html` — 4 → 128 spacing tokens visualized
- `preview/radii.html` — radius scale
- `preview/shadows.html` — shadow-1 + shadow-2
- `preview/components-buttons.html` — primary / secondary / ghost / whatsapp, all states
- `preview/components-inputs.html` — input / textarea / focus
- `preview/components-cards.html` — product card, reference card
- `preview/components-badges.html` — badges, tag chips
- `preview/brand-logo.html` — wordmark in both colorways
- `preview/brand-monogram.html` — monogram variants
- `preview/brand-pattern.html` — hazard-stripe pattern preview
- `preview/brand-wordmark-usage.html` — wordmark on cream + navy + photo

### `ui_kits/website/`
- `README.md` — kit overview
- `index.html` — interactive marketing site (home → products → contact → WhatsApp handoff)
- `Header.jsx`, `Footer.jsx`, `Hero.jsx`, `ProductGrid.jsx`, `AboutStrip.jsx`, `ReferencesMarquee.jsx`, `ContactBlock.jsx`, `WhatsAppFAB.jsx`, `Button.jsx`, `Logo.jsx`, `Icon.jsx`

---

## Known caveats

1. **Sandbox couldn't download live product images** — the UI kit uses styled photo placeholders. URLs are preserved in `assets/remote_images.txt` for manual download.
2. **No existing logo** — the wordmark and monogram are original designs, proposed for approval.
3. **No existing brand palette** — colors are proposed based on the category (industrial workwear) and Turkish cultural context. The client may have colors I don't know about.
4. **Font substitutions** — Archivo Black and Inter Tight are Google Fonts substitutes for fonts this brand doesn't yet own.
5. **Lucide icons** — proposed; swap if the client prefers another set.

Please review and mark up anything you'd like changed.
