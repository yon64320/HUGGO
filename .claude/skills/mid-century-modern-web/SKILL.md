---
name: mid-century-modern-web
description: Apply a complete Mid-Century Modern (MCM) design system to an existing website. Invoke when the user wants to refonte des couleurs, apply MCM aesthetics, transform a site into mid-century modern style, or use beige/sage/terracotta color scheme. Runs a 5-phase audit → plan → implement workflow.
---

# Mid-Century Modern Web Design System

Apply a professional MCM design system to any web project. Think like a 1950s art director: discipline, restraint, visual weight — not decoration.

## Quick Start

1. Read [`references/color-system.md`](references/color-system.md) — the palette is fixed, internalize the 60-30-10 rule
2. Read [`references/css-snippets.md`](references/css-snippets.md) — use these as your implementation source of truth
3. Run the 5 phases below in strict order — do not skip or reorder

---

## The 5 Phases

### PHASE 1 — EXPLORE
Use ultrathink. Read the entire project before touching anything.

- Identify the stack: vanilla CSS / SCSS / Tailwind / CSS-in-JS / CSS Modules
- Find all color definitions: CSS custom properties, Tailwind config, hardcoded hex values, JS color variables
- Find all font definitions: Google Fonts links, font-family declarations, `@font-face`
- List all key components: nav, hero, sections, cards, buttons, forms, footer
- Count unique colors currently in use and note where each appears

Produce a brief inventory before moving on.

### PHASE 2 — AUDIT
Create a structured "before" snapshot:

| Current value | Semantic role | Files affected |
|---|---|---|
| #1a1a2e | primary text | globals.css, Card.tsx |
| … | … | … |

Also note:
- Current font stack (headlines / body)
- Typical section padding and component gaps
- Any hardcoded colors in JSX/TSX/HTML attributes (inline styles, className strings)
- Images or SVGs with embedded colors that may clash with the MCM palette

### PHASE 3 — PLAN
Generate the transformation mapping:

| Old value | MCM token | MCM hex |
|---|---|---|
| #1a1a2e | --espresso | #3D2314 |
| … | … | … |

Define:
- Which files to edit, in which order (globals first → components → pages)
- Which MCM geometric accents to add and where (consult snippets)
- Where to inject the Google Fonts link
- Any edge cases — consult [`references/edge-cases.md`](references/edge-cases.md) if using Tailwind, CSS Modules, or no custom properties

Confirm the plan before implementing.

### PHASE 4 — IMPLEMENT
Apply in this exact order:

1. **Design tokens** — set `:root` CSS custom properties (copy from color-system.md)
2. **Google Fonts** — inject in `<head>` or framework equivalent: `DM Serif Display` + `DM Sans` with `font-display: swap`
3. **Global styles** — body: bg `--cream`, text `--espresso`, font DM Sans, line-height 1.75, prose max-width 65ch
4. **Navigation** — bg `--sage`, links `--parchment`, hover `--sage-light`, primary CTA `--terracotta`
5. **Hero** — bg `--cream` or `--parchment`, H1 ≥3rem, asymmetric grid (never 1fr 1fr)
6. **Sections** — alternate: `--cream` → `--sage` → `--parchment` → `--sand` — never two identical consecutive
7. **Cards** — bg `--sand`, border 1px `--walnut`, border-radius max 3px
8. **Buttons** — primary: `--terracotta` bg + `--parchment` text; secondary: `--sage` + `--parchment`; tertiary: outlined `--walnut`
9. **Footer** — bg `--moss`, text `--cream`
10. **Geometric accents** — add CSS-only MCM shapes (circle, dot-grid, diagonal stripe) — use snippets
11. **Typography** — modular scale, letter-spacing on headings, all-caps + wide tracking for eyebrow labels
12. **Responsive** — verify MCM rhythm holds on mobile (asymmetric grids stack to single column)

### PHASE 5 — VERIFY
Run grep for any color not in the palette, then check every item:

- [ ] Zero instances of `#000` or `#fff` in the codebase
- [ ] All colors are palette tokens — no rogue hex values
- [ ] Terracotta appears ONLY on buttons, badges, key interactive elements
- [ ] Sage covers approximately 25–35% of visual surfaces
- [ ] Neutrals (cream/sand/parchment) cover 55–65% of visual surfaces
- [ ] Every major section has at least one MCM geometric accent
- [ ] Google Fonts loaded with `font-display: swap`
- [ ] WCAG AA contrast verified for all text/background pairs (see color-system.md)
- [ ] All links, forms, and JS interactions still work
- [ ] Typographic hierarchy is clear at a glance (H1 > H2 > H3 > body)

---

## MCM Laws — DO / DON'T

### Colors
```css
/* ✅ DO */
background-color: var(--cream);
color: var(--espresso);
border: 1px solid var(--walnut);

/* ❌ DON'T */
background-color: #000;          /* pure black — banned */
color: white;                    /* pure white — banned */
background: var(--terracotta);   /* terracotta as section bg — banned */
```

### Gradients
```css
/* ✅ DO — flat color only */
background-color: var(--sage);

/* ❌ DON'T */
background: linear-gradient(135deg, var(--sage), var(--moss));
```

### Border radius
```css
/* ✅ DO */
border-radius: 3px;   /* cards, containers */
border-radius: 50%;   /* decorative circles only */

/* ❌ DON'T */
border-radius: 16px;  /* too bubbly — not MCM */
```

### Layout
```css
/* ✅ DO — asymmetric visual weight */
grid-template-columns: 1.5fr 1fr;
grid-template-columns: 2fr 1fr;

/* ❌ DON'T — mechanical symmetry kills MCM tension */
grid-template-columns: 1fr 1fr;
```

### Section alternation
```css
/* ✅ DO — varied rhythm */
.s1 { background: var(--cream); }
.s2 { background: var(--sage); }
.s3 { background: var(--parchment); }

/* ❌ DON'T — two identical consecutive */
.s2 { background: var(--sage); }
.s3 { background: var(--sage); }
```

### Whitespace
```css
/* ✅ DO — generous, intentional */
padding: 5rem 2rem;
gap: 2.5rem;

/* ❌ DON'T — too tight */
padding: 1rem;
gap: 0.5rem;
```

---

## Reference Files

- [`references/color-system.md`](references/color-system.md) — Full palette CSS tokens, semantic usage guide, WCAG AA contrast table
- [`references/css-snippets.md`](references/css-snippets.md) — Ready-to-paste CSS: tokens, buttons, nav, cards, color-blocking, geometric accents, typography scale
- [`references/edge-cases.md`](references/edge-cases.md) — Tailwind projects, CSS Modules, projects without CSS custom properties
