# Fonts

Kardeşler Tekstil did not provide proprietary font files. Two Google Fonts substitutes are used across the system:

## Display — Archivo Black
Heavy, condensed-ish grotesque. Used for headlines (ALL CAPS), the wordmark, and all hero copy.

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">
```

## Body / UI — Inter Tight
Neutral, tight-metric sans. Used for paragraphs, buttons, form inputs, navigation, tables.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Combined import (what the UI kit uses)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## If you want local files

Download the TTFs from <https://fonts.google.com> and drop them into this folder:

```
fonts/
├── ArchivoBlack-Regular.ttf
├── InterTight-Regular.ttf
├── InterTight-Medium.ttf
├── InterTight-SemiBold.ttf
└── InterTight-Bold.ttf
```

Then add `@font-face` rules to `colors_and_type.css` — sample block is commented in that file.

## ⚠️ Substitution flag
These are **proposals**, not the brand's real fonts. If Kardeşler Tekstil has licensed typefaces, please provide the files and I will wire them in.
