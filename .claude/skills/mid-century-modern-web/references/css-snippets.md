# MCM CSS Snippets

Ready-to-paste snippets for all common MCM patterns. These are the reference implementation — use them directly or adapt them to the project's CSS methodology.

---

## Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

CSS font-family variables:
```css
:root {
  --font-headline: 'DM Serif Display', 'Playfair Display', Georgia, serif;
  --font-body:     'DM Sans', 'Outfit', system-ui, sans-serif;
}
```

---

## Global Styles

```css
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  background-color: var(--cream);
  color: var(--espresso);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}

p, li {
  max-width: 65ch;
}

img, svg {
  display: block;
  max-width: 100%;
}
```

---

## Typography Scale

```css
h1 {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.1;
  color: var(--espresso);
}

h2 {
  font-family: var(--font-headline);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 400;
  letter-spacing: 0.025em;
  line-height: 1.2;
  color: var(--espresso);
}

h3 {
  font-family: var(--font-headline);
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.3;
  color: var(--walnut);
}

/* Section eyebrow / label */
.eyebrow {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--caramel);
  margin-bottom: 1rem;
}
```

---

## Buttons

```css
/* Primary — terracotta */
.btn-primary {
  display: inline-block;
  background-color: var(--terracotta);
  color: var(--parchment);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.btn-primary:hover,
.btn-primary:focus-visible {
  background-color: var(--clay);
  outline: 2px solid var(--clay);
  outline-offset: 2px;
}

/* Secondary — sage */
.btn-secondary {
  display: inline-block;
  background-color: var(--sage);
  color: var(--parchment);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.btn-secondary:hover,
.btn-secondary:focus-visible {
  background-color: var(--forest);
}

/* Tertiary — outlined */
.btn-tertiary {
  display: inline-block;
  background-color: transparent;
  color: var(--walnut);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.8rem 1.9rem;
  border: 1.5px solid var(--walnut);
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.btn-tertiary:hover,
.btn-tertiary:focus-visible {
  background-color: var(--walnut);
  color: var(--parchment);
}
```

---

## Navigation

```css
.nav {
  background-color: var(--sage);
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.nav-logo {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--parchment);
  text-decoration: none;
  letter-spacing: 0.04em;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--parchment);
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.15s ease, color 0.15s ease;
}
.nav-link:hover {
  opacity: 1;
  color: var(--sage-light);
}
.nav-link.active {
  opacity: 1;
  color: var(--cream);
}

.nav-cta {
  /* Use .btn-primary */
}
```

---

## Hero Section

```css
.hero {
  position: relative;
  overflow: hidden;
  background-color: var(--cream);
  padding: 6rem 2rem 5rem;
}

.hero-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr; /* asymmetric — key MCM principle */
  gap: 4rem;
  align-items: center;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-image {
  position: relative;
}

/* Decorative circle accent behind image */
.hero-image::before {
  content: '';
  position: absolute;
  width: 320px;
  height: 320px;
  border: 6px solid var(--sage-light);
  border-radius: 50%;
  top: -40px;
  right: -60px;
  z-index: -1;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .hero-image::before {
    display: none;
  }
}
```

---

## Cards

```css
.card {
  background-color: var(--sand);
  border: 1px solid var(--walnut);
  border-radius: 3px;
  padding: 2rem;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 4px 4px 0 var(--walnut); /* flat MCM shadow — not blurred */
}

.card-label {
  /* Use .eyebrow */
}

.card-title {
  font-family: var(--font-headline);
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  color: var(--espresso);
  margin-bottom: 0.75rem;
}

.card-body {
  font-size: 0.9375rem;
  color: var(--walnut);
  line-height: 1.75;
}
```

---

## Section Color Blocking

```css
/* Standard section */
.section {
  padding: 5rem 2rem;
}

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* Alternation classes */
.section--cream     { background-color: var(--cream); }
.section--sage      { background-color: var(--sage); color: var(--parchment); }
.section--parchment { background-color: var(--parchment); }
.section--sand      { background-color: var(--sand); }

/* Text color override for dark sections */
.section--sage h1,
.section--sage h2,
.section--sage h3 {
  color: var(--cream);
}
.section--sage p,
.section--sage li {
  color: var(--parchment);
}
.section--sage .eyebrow {
  color: var(--sage-light);
}
```

---

## MCM Geometric Accents

### Decorative Circle
```css
.mcm-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

/* Large sage ring */
.mcm-circle--ring-sage {
  width: 400px;
  height: 400px;
  border: 8px solid var(--sage);
  background: transparent;
}

/* Small filled terracotta dot */
.mcm-circle--dot-terracotta {
  width: 24px;
  height: 24px;
  background-color: var(--sienna);
}

/* Medium filled sand */
.mcm-circle--fill-sand {
  width: 200px;
  height: 200px;
  background-color: var(--sand);
}
```

### Dot Grid Pattern
```css
.mcm-dot-grid {
  background-image: radial-gradient(circle, var(--walnut) 1.5px, transparent 1.5px);
  background-size: 28px 28px;
  background-color: var(--cream);
}

/* Sage version */
.section--sage .mcm-dot-grid {
  background-image: radial-gradient(circle, var(--forest) 1.5px, transparent 1.5px);
  background-color: var(--sage);
}
```

### Diagonal Stripe
```css
.mcm-stripe {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 18px,
    var(--sand) 18px,
    var(--sand) 20px
  );
}

/* Used as a section divider or hero background layer */
.mcm-stripe-overlay {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 20px,
    rgba(94, 122, 94, 0.08) 20px,  /* --sage at low opacity */
    rgba(94, 122, 94, 0.08) 22px
  );
}
```

### Horizontal Rule / Divider
```css
.mcm-rule {
  height: 3px;
  background-color: var(--walnut);
  border: none;
  width: 60px;   /* short, intentional — not full width */
  margin: 1.5rem 0;
}

.mcm-rule--terracotta {
  background-color: var(--terracotta);
}
```

---

## Footer

```css
.footer {
  background-color: var(--moss);
  color: var(--cream);
  padding: 4rem 2rem 2.5rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
}

.footer-logo {
  font-family: var(--font-headline);
  font-size: 1.75rem;
  color: var(--cream);
  letter-spacing: 0.04em;
}

.footer-link {
  color: var(--sage-light);
  text-decoration: none;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  transition: color 0.15s ease;
}
.footer-link:hover {
  color: var(--cream);
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--forest);
  font-size: 0.8125rem;
  color: var(--sage-light);
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

---

## Asymmetric Content Grid

```css
/* 2-column asymmetric — image left, text right */
.mcm-split {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
}

/* Reversed variant */
.mcm-split--reverse {
  grid-template-columns: 1fr 1.4fr;
}
.mcm-split--reverse .mcm-split-media {
  order: 2;
}
.mcm-split--reverse .mcm-split-content {
  order: 1;
}

@media (max-width: 768px) {
  .mcm-split,
  .mcm-split--reverse {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .mcm-split--reverse .mcm-split-media,
  .mcm-split--reverse .mcm-split-content {
    order: unset;
  }
}
```
