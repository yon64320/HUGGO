# Edge Cases — Stack-Specific Adaptation

## Tailwind CSS Projects

Do not add raw CSS classes — extend the Tailwind config to expose MCM tokens as Tailwind utilities.

### 1. Extend `tailwind.config.js` / `tailwind.config.ts`

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // 60% — Neutrals
        cream:     '#F5EDD8',
        sand:      '#EAD9BB',
        parchment: '#F9F4EA',
        espresso:  '#3D2314',
        walnut:    '#6B3D25',
        caramel:   '#9B6B4A',
        // 30% — Sage Green
        sage: {
          DEFAULT: '#5E7A5E',
          light:   '#8FAF82',
          forest:  '#3E5C40',
          moss:    '#2D4430',
        },
        // 10% — Terracotta
        terracotta: {
          DEFAULT: '#C45A35',
          clay:    '#A04228',
          sienna:  '#D97A58',
        },
      },
      fontFamily: {
        headline: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        body:     ['"DM Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'mcm-eyebrow': '0.15em',
        'mcm-heading': '0.03em',
      },
    },
  },
}
```

### 2. Usage in markup

```html
<!-- Section -->
<section class="bg-cream py-20 px-8">
  <span class="font-body text-xs uppercase tracking-mcm-eyebrow text-caramel">Label</span>
  <h2 class="font-headline text-4xl tracking-mcm-heading text-espresso">Title</h2>
</section>

<!-- Sage section -->
<section class="bg-sage py-20 px-8">
  <h2 class="font-headline text-cream">Title</h2>
  <p class="font-body text-parchment">Body text</p>
</section>

<!-- Button -->
<button class="bg-terracotta text-parchment text-sm uppercase tracking-[0.08em] px-8 py-3.5 rounded-sm hover:bg-terracotta-clay transition-colors">
  CTA
</button>
```

### 3. Add Google Fonts to your HTML `<head>`
Tailwind doesn't handle font loading — add the `<link>` tag manually or use `next/font` in Next.js (see Next.js section below).

---

## CSS Modules Projects

CSS Modules scope class names locally. The MCM tokens still live in a global CSS file — only component-level classes are scoped.

### 1. Create a global tokens file

```css
/* styles/tokens.css  — imported globally, NOT as a module */
:root {
  --cream:     #F5EDD8;
  --sand:      #EAD9BB;
  --parchment: #F9F4EA;
  --espresso:  #3D2314;
  --walnut:    #6B3D25;
  --caramel:   #9B6B4A;
  --sage:       #5E7A5E;
  --forest:     #3E5C40;
  --sage-light: #8FAF82;
  --moss:       #2D4430;
  --terracotta: #C45A35;
  --clay:       #A04228;
  --sienna:     #D97A58;
  --font-headline: 'DM Serif Display', Georgia, serif;
  --font-body:     'DM Sans', system-ui, sans-serif;
}
```

Import it in `_app.tsx` / `layout.tsx` (not as a module):
```ts
// _app.tsx
import '../styles/tokens.css'
```

### 2. Use tokens in `.module.css` files

```css
/* Button.module.css */
.primary {
  background-color: var(--terracotta);
  color: var(--parchment);
  /* all other MCM button styles */
}
```

CSS custom properties cross the module boundary — they are global. This works correctly.

---

## Next.js Projects

### Google Fonts with `next/font`

Preferred approach — avoids FOUC and ships fonts optimally:

```ts
// app/layout.tsx or pages/_app.tsx
import { DM_Serif_Display, DM_Sans } from 'next/font/google'

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Then in CSS:
```css
h1, h2, h3 { font-family: var(--font-headline); }
body        { font-family: var(--font-body); }
```

---

## Projects Without CSS Custom Properties

If the project uses only hardcoded values (old jQuery site, legacy HTML, no build tool):

1. Add a `<style>` block at the top of the main CSS file with the `:root` block from color-system.md
2. If CSS custom properties are not supported at all (IE11 or older — very rare), use a find-and-replace approach: replace each hardcoded color with the corresponding MCM hex value directly, and add a comment indicating the token name

```css
/* Legacy — no custom property support */
.btn-primary {
  background-color: #C45A35;  /* --terracotta */
  color: #F9F4EA;             /* --parchment */
}
```

Keep a comment map at the top of the file:
```css
/*
  MCM PALETTE
  --cream:     #F5EDD8
  --sand:      #EAD9BB
  --parchment: #F9F4EA
  --espresso:  #3D2314
  --walnut:    #6B3D25
  --caramel:   #9B6B4A
  --sage:      #5E7A5E
  --forest:    #3E5C40
  --sage-light:#8FAF82
  --moss:      #2D4430
  --terracotta:#C45A35
  --clay:      #A04228
  --sienna:    #D97A58
*/
```

---

## SCSS / Sass Projects

Use Sass variables in a `_tokens.scss` partial:

```scss
// styles/_tokens.scss
$cream:     #F5EDD8;
$sand:      #EAD9BB;
$parchment: #F9F4EA;
$espresso:  #3D2314;
$walnut:    #6B3D25;
$caramel:   #9B6B4A;
$sage:       #5E7A5E;
$forest:     #3E5C40;
$sage-light: #8FAF82;
$moss:       #2D4430;
$terracotta: #C45A35;
$clay:       #A04228;
$sienna:     #D97A58;

$font-headline: 'DM Serif Display', Georgia, serif;
$font-body:     'DM Sans', system-ui, sans-serif;

// Also emit as CSS custom properties for runtime access
:root {
  --cream:     #{$cream};
  --sand:      #{$sand};
  --parchment: #{$parchment};
  --espresso:  #{$espresso};
  --walnut:    #{$walnut};
  --caramel:   #{$caramel};
  --sage:       #{$sage};
  --forest:     #{$forest};
  --sage-light: #{$sage-light};
  --moss:       #{$moss};
  --terracotta: #{$terracotta};
  --clay:       #{$clay};
  --sienna:     #{$sienna};
}
```

Import in other partials: `@use 'tokens' as *;`
