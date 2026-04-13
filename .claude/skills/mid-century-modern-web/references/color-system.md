# MCM Color System

## 60-30-10 Rule

| Tier | % | Role | Tokens |
|---|---|---|---|
| Neutrals | 60% | Backgrounds, all text | cream, sand, parchment, espresso, walnut, caramel |
| Sage green | 30% | Nav, sections, structural blocks | sage, forest, sage-light, moss |
| Terracotta | 10% | CTAs, badges, key accents ONLY | terracotta, clay, sienna |

**Critical**: Terracotta must never appear as a section background, body text, or structural element.
**Critical**: Never use `#000000` or `#ffffff` — always use palette values.

---

## CSS Custom Properties — Copy This Into `:root`

```css
:root {
  /* 60% — Warm Neutrals */
  --cream:     #F5EDD8;  /* primary background */
  --sand:      #EAD9BB;  /* cards, secondary sections */
  --parchment: #F9F4EA;  /* lightest sections, near-white */
  --espresso:  #3D2314;  /* primary text */
  --walnut:    #6B3D25;  /* secondary text, borders */
  --caramel:   #9B6B4A;  /* muted text, icons, placeholders */

  /* 30% — Sage Green */
  --sage:       #5E7A5E;  /* main secondary, nav bg, section accents */
  --forest:     #3E5C40;  /* contrast within sage zones */
  --sage-light: #8FAF82;  /* hover states, tints */
  --moss:       #2D4430;  /* footer, deep containers */

  /* 10% — Terracotta (CTAs and accents only) */
  --terracotta: #C45A35;  /* primary buttons, active states */
  --clay:       #A04228;  /* hover/focus on terracotta elements */
  --sienna:     #D97A58;  /* warm decorative accents — use sparingly */
}
```

---

## Semantic Usage Guide

| Token | Use on | Never use for |
|---|---|---|
| `--cream` | Main page background, hero bg | Text on light backgrounds |
| `--sand` | Card backgrounds, alternate sections | Primary text |
| `--parchment` | Light section alternates, text on dark | Dark text (too low contrast) |
| `--espresso` | All body text, headings on light bg | Backgrounds |
| `--walnut` | Secondary text, borders, dividers | CTAs, large backgrounds |
| `--caramel` | Placeholders, icons, muted labels | Primary text (fails WCAG on cream) |
| `--sage` | Nav bg, section bg, secondary buttons | Body text, primary text |
| `--forest` | Deeper accents within sage zones | Large body text |
| `--sage-light` | Hover states, subtle bg tints | High-contrast text needs |
| `--moss` | Footer bg, darkest containers | Light-colored text areas |
| `--terracotta` | Primary CTA buttons, active badges | Section backgrounds, text, borders |
| `--clay` | Hover/focus states on terracotta elements | Independent use |
| `--sienna` | Decorative accents (max 1–2 per page) | Anything functional |

---

## WCAG AA Contrast Table

### Valid Combinations ✅
| Text | Background | Approx. Ratio | Use for |
|---|---|---|---|
| `--espresso` | `--cream` | 9.8:1 | Primary text on main bg |
| `--espresso` | `--parchment` | 10.2:1 | Primary text on light sections |
| `--espresso` | `--sand` | 8.1:1 | Card text |
| `--espresso` | `--sage-light` | 5.1:1 | Text in subtle sage zones |
| `--parchment` | `--sage` | 4.6:1 | Nav links, text on sage sections |
| `--parchment` | `--forest` | 6.8:1 | Text in forest bg zones |
| `--cream` | `--forest` | 6.2:1 | Text on dark green |
| `--parchment` | `--moss` | 8.4:1 | Footer text |
| `--cream` | `--moss` | 7.9:1 | Footer text variant |
| `--parchment` | `--terracotta` | 3.1:1 | Button text (large text only — min 18px) |
| `--cream` | `--espresso` | 9.8:1 | Inverted text blocks |

### Invalid Combinations ❌ — Never Use These
| Text | Background | Problem |
|---|---|---|
| `--caramel` | `--cream` | Ratio ~2.4:1 — fails WCAG |
| `--walnut` | `--sand` | Ratio ~2.8:1 — too similar |
| `--sienna` | `--cream` | Ratio ~2.1:1 — fails WCAG |
| `--sage` | `--cream` | Ratio ~2.3:1 — fails for body text |
| `--caramel` | `--parchment` | Ratio ~2.2:1 — fails WCAG |

**Rule**: If you need text on `--sage`, `--forest`, or `--moss`, use `--parchment` or `--cream`. Never `--caramel` or `--walnut`.

---

## Section Alternation Pattern

The only valid alternation sequences:

```
cream → sage → cream → parchment → cream → sand
cream → parchment → sage → cream → moss (footer)
parchment → sage → sand → moss (footer)
```

Never:
```
sage → sage           (two consecutive identical)
terracotta → [any]    (terracotta as section bg)
```
