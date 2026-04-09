# Tech Stack v1 — HUGGO

> **Projet** : Site vitrine premium HUGGO
> **Version** : v1.0
> **Date** : 2026-04-09
> **Statut** : READY FOR QA — validation requise avant Gate 6

---

## A) TECH REQUIREMENTS SUMMARY

### Types de pages

| Page | Rendu | Dynamisme côté client |
|------|-------|----------------------|
| Accueil (/) | SSG (statique) | Élevé — Spline 3D lazy island, counter animations GSAP, logo bar CSS, smooth scroll Lenis |
| Retail (/retail) | SSG | Moyen — counter animations, staggered cards, accordion FAQ |
| Franchise (/franchise) | SSG | Moyen — counter animations, staggered cards, accordion FAQ |
| Collectivity (/collectivity) | SSG | Moyen — counter animations, staggered cards, accordion FAQ |
| Comment ça marche (/how-it-works) | SSG | Moyen — 4-step reveal GSAP, counter animations, accordion FAQ |
| Tarifs (/pricing) | SSG | Moyen — staggered cards, counter ROI, accordion FAQ |
| À propos (/about) | SSG | Moyen — counter animations, staggered fade-ups |
| Contact (/contact) | SSG | Faible — CSS-only animations (Tier 1), validation formulaire JS minimal |

**Verdict** : toutes les pages sont statiques. Aucun contenu dynamique côté serveur (pas de CMS, pas de base de données, pas d'authentification). Le JS côté client se limite aux animations Tier 2/3 et à la soumission de formulaires.

### Interactivité : MEDIUM-HIGH

**Justification** : la majorité des pages utilise du Tier 2 GSAP (scroll-triggered animations, counters, staggered reveals). Seule la page d'accueil atteint le Tier 3 avec le smartphone 3D Spline. La page Contact reste Tier 1 CSS-only pour maximiser la vitesse de conversion. L'interactivité est concentrée sur les animations d'entrée et les micro-interactions, pas sur de la logique applicative.

### Editing

Site statique, éditable par un développeur. Pas de CMS, pas d'éditeur WYSIWYG. Le contenu bilingue FR/EN est maintenu en fichiers Markdown ou JSON dans le repo. Ce choix est dicté par le PRD (§12) et le pack stratégie (§Editing) : le client n'a pas besoin de modifier le contenu sans intervention développeur.

### Effets premium : Tier 3

- **Budget JS eager** : ~33 KB gzipped (GSAP core 24 KB + ScrollTrigger 4 KB + Lenis 5 KB)
- **Budget JS lazy** : +150-300 KB (Spline runtime, chargé uniquement sur desktop + WebGL)
- **CSS-only** : logo bar scroll infini, micro-interactions hover/focus/press, accordion open/close, header compact
- **Condition de downgrade** : si Lighthouse mobile < 85 avec Spline lazy actif, downgrade à Tier 2 + image statique haute qualité du smartphone

### Design tokens

Consommer `tokens.json` (W3C Design Tokens 2025.10) comme source de vérité. Pipeline build-time : tokens.json → CSS custom properties. Espace colorimétrique source : Oklch. Fallback sRGB hex via `@supports (color: oklch(0 0 0))` pour progressive enhancement.

### Theming : Light + Dark mode

- Toggle dans le header + respect `prefers-color-scheme` système
- Implémentation via CSS custom properties switchées par attribut `data-theme` sur `<html>`
- Persistance du choix utilisateur en `localStorage`
- Les tokens qui changent sont documentés dans la table dark mode overrides du component handoff

### i18n : Bilingue FR/EN (statique)

- Structure URL : `/fr/`, `/en/` avec langue par défaut FR
- Chaque page pointe vers sa version miroir via `hreflang`
- Toggle langue dans le header avec redirection vers la page miroir
- Contenu stocké dans des fichiers i18n statiques (JSON ou YAML), pas de service de traduction runtime

### Intégrations

| Intégration | Type | Complexité |
|-------------|------|-----------|
| Formulaires (démo + contact) | Soumission webhook/email agnostique | Faible |
| Analytics (GA4 ou Plausible) | Script tracking | Faible |
| WhatsApp flottant | Lien `https://wa.me/{numero}` | Minimale |
| Logo bar CSS-only | ~50 logos B&W, scroll CSS infini | Moyenne (asset pipeline) |
| Vidéo démo | YouTube/Vimeo embed lazy | Faible |
| SEO technique | Sitemap XML, robots.txt, Schema.org | Moyenne |

### Contraintes PRD (§15) — objectifs de performance

| Métrique | Cible PRD | Budget technique |
|----------|-----------|-----------------|
| LCP | < 2.5s | Le H1 + sous-titre sont du HTML statique. Le 3D Spline est lazy-loadé APRÈS le LCP. Images hero en WebP optimisé. Fonts preloaded (Plus Jakarta Sans 700, DM Sans 400/600) |
| INP | < 200ms | Pas de JS lourd sur le thread principal. GSAP utilise requestAnimationFrame. Formulaires validation native HTML5 + JS léger |
| CLS | < 0.1 | Dimensions explicites sur images/embeds. Fonts avec `font-display: swap` + `size-adjust`. Logo bar en overflow hidden, hauteur fixe |
| Lighthouse Perf | > 90 | Budget JS total eager < 50 KB gzipped (framework 0 KB Astro + 33 KB animations). Spline lazy desktop-only. Images WebP + srcset |
| Lighthouse A11y | > 95 | Semantic HTML, ARIA labels sur tous les éléments interactifs, focus visible, contraste 4.5:1 vérifié, skip-to-content |

---

## B) FRONTEND DECISION FRAMEWORK

### Comparaison : Astro vs Next.js vs Nuxt

| Critère | Astro 5 | Next.js 15 (App Router) | Nuxt 3 |
|---------|---------|-------------------------|--------|
| **JS par défaut** | 0 KB — zero JS unless opted in via islands | ~80-90 KB React runtime (react + react-dom) | ~50-60 KB Vue runtime |
| **Modèle de rendu** | SSG natif, islands architecture | SSG possible mais SSR-first, hydratation complète par défaut | SSG possible, hydratation complète par défaut |
| **Compatibilité Tier 3** (GSAP + Lenis + Spline) | GSAP/Lenis via `<script>` vanilla ou island React/Svelte. Spline via island React lazy-loadée. Pas de runtime framework global — chaque island est isolée | Natif — Spline React, GSAP dans useEffect. Mais le runtime React est chargé globalement même pour les pages sans interactivité | GSAP via composable Vue, Lenis via plugin. Spline nécessite un wrapper Vue ou un iframe. Runtime Vue global |
| **i18n statique FR/EN** | `@astrojs/i18n` ou routing basé fichiers `/fr/`, `/en/` — zero overhead JS | `next-intl` ou routing i18n natif — fonctionne mais charge le runtime React même pour du contenu statique | `@nuxtjs/i18n` — mature mais runtime Vue chargé |
| **Dark mode** | CSS custom properties + `<script is:inline>` pour le toggle (0 KB framework) | Nécessite un composant React client pour le toggle + Context provider → runtime React chargé | Plugin Vue dark mode → runtime Vue chargé |
| **Performance SSG** | Lighthouse 95-100 atteignable sans effort — pas de JS non désiré | Lighthouse 90+ atteignable mais nécessite du travail d'optimisation (tree-shaking React, dynamic imports, `use client` boundaries) | Lighthouse 90+ atteignable avec optimisation |
| **Écosystème** | Growing, 50K+ GitHub stars, intégrations officielles (Tailwind, MDX, React/Svelte/Vue islands) | Massive, mature, vaste écosystème React | Mature, écosystème Vue |
| **DX pour site vitrine** | Conçu spécifiquement pour les sites orientés contenu. Templates `.astro` avec du HTML natif | Conçu pour des applications React. Overkill pour du contenu statique mais fonctionne | Conçu pour des applications Vue. Même constat |
| **Risque** | Écosystème plus jeune pour les cas edge. Certains packages React nécessitent un adapter | Framework le plus adopté — risque minimal d'abandon | Lié à l'écosystème Vue — plus petit que React |

### Analyse spécifique au projet HUGGO

**Contrainte dominante** : Lighthouse Perf > 90 avec Tier 3 (Spline 3D). Le budget JS est serré : 33 KB eager (animations) + 150-300 KB lazy (Spline). Chaque KB de runtime framework non nécessaire réduit la marge.

- **Astro** ship 0 KB JS par défaut. Les 33 KB GSAP/Lenis sont les seuls JS eager. Le Spline island charge uniquement sur la page d'accueil, uniquement sur desktop. Les 7 autres pages n'ont aucun runtime framework global. Résultat : marge confortable pour Lighthouse > 90.

- **Next.js** impose ~80-90 KB de runtime React sur TOUTES les pages, même celles qui n'ont que du Tier 1 CSS (Contact) ou du Tier 2 GSAP. Le budget total eager = 80 KB (React) + 33 KB (GSAP/Lenis) = 113 KB. Sur mobile 3G, cela impacte le TTI et potentiellement le LCP. Atteindre Lighthouse Perf > 90 mobile nécessite un travail d'optimisation significatif.

- **Nuxt** impose ~50-60 KB de runtime Vue. Mieux que Next.js mais toujours du runtime inutile pour des pages 100% statiques. Le wrapper Spline pour Vue est moins mature que `@splinetool/react-spline`.

### Recommandation

**Astro 5 — RECOMMANDÉ**

**Conditions "if…then…"** :

- **Si le projet nécessite à terme des fonctionnalités applicatives** (dashboard, auth, espace client) : reconsidérer Next.js. Mais le PRD exclut explicitement ces fonctionnalités (§14 : "Espace client / dashboard commerçant — hors périmètre").
- **Si l'équipe de développement est exclusivement React et refuse d'écrire du `.astro`** : Next.js avec App Router + aggressive code-splitting. Coût : +80 KB runtime, Lighthouse Perf cible réduite à > 85.
- **Si l'équipe est Vue-first** : Nuxt 3. Mais le wrapper Spline Vue est moins mature — risque technique accru pour le hero 3D.

### Decision Log — Frontend Framework

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Astro 5** | 0 KB JS par défaut. Budget JS maximal pour les animations Tier 3. Islands architecture isole le Spline React à une seule page. SSG natif. i18n statique sans overhead. Dark mode CSS-only. Lighthouse > 90 atteignable sans optimisation agressive. | Next.js 15 (rejeté : +80 KB runtime React inutile sur 7/8 pages statiques, réduit la marge perf pour Tier 3). Nuxt 3 (rejeté : runtime Vue inutile, Spline wrapper Vue immature). | Écosystème plus jeune. Certains packages npm React-only nécessitent un island adapter. | Moyenne — la couche contenu (Markdown, i18n JSON) est portable. Les islands React sont des composants React standard, réutilisables dans Next.js. Le coût de migration est la réécriture des templates `.astro` en JSX/TSX. |
| **Webflow** — exclu | Webflow ne supporte pas : (1) GSAP ScrollTrigger custom, (2) Spline 3D islands avec lazy-load conditionnel, (3) tokens W3C → CSS custom properties pipeline, (4) dark mode par data-attribute, (5) i18n statique FR/EN propre. Chaque contournement (embed custom code) annule les avantages no-code et crée une dette technique. Le PRD spécifie "éditable par un développeur" — pas besoin d'un outil no-code. | — | — | — |

### CSS Framework

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Tailwind CSS 4** | Utility-first élimine le CSS mort. Responsive mobile-first natif (sm/md/lg/xl/2xl). Dark mode via `dark:` variant liée à `data-theme`. Intégration Astro officielle. Les tokens du design system se mappent aux custom properties Tailwind via `@theme`. Pas de runtime JS. | CSS modules (rejeté : verbeux pour un site de 8 pages, pas de responsive built-in). Vanilla CSS (rejeté : risque de CSS mort, pas de purge automatique). UnoCSS (rejeté : écosystème plus petit, documentation moins complète). | Courbe d'apprentissage si l'équipe ne connaît pas Tailwind. Classes longues dans le markup. | Élevée — Tailwind est du CSS compilé. Migration vers vanilla CSS ou CSS modules = réécrire les classes en sélecteurs. |

### Fonts

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Plus Jakarta Sans** (display, variable font) + **DM Sans** (body, variable font) + **JetBrains Mono** (data, variable font) | Tokens typography spécifient ces 3 familles. Variable fonts réduisent le nombre de fichiers (1 fichier par famille vs 1 par weight). Hébergement self-hosted (pas de Google Fonts CDN) pour contrôler le FOIT/FOUT et le GDPR. `font-display: swap` + `size-adjust` pour CLS < 0.1. | Google Fonts CDN (rejeté : requête DNS externe, GDPR France — les polices Google peuvent constituer un transfert de données vers les US sans consentement). | Poids total 3 variable fonts : ~200-250 KB. Mitigation : preload uniquement les weights utilisés above-the-fold (Jakarta 700, DM Sans 400). | Élevée — changer de police = modifier tokens.json + tailwind config. |

---

## C) BACKEND DECISION FRAMEWORK

### Verdict : PAS DE BACKEND

**Justification** :

1. **Aucun contenu dynamique** — les 8 pages sont statiques. Le contenu bilingue FR/EN est déterminé au build, pas au runtime.
2. **Pas de CMS** — le PRD et le pack stratégie spécifient "site statique, éditable par un développeur". Le contenu change rarement (pas de blog, pas de news).
3. **Pas d'authentification** — pas d'espace client, pas de dashboard (PRD §14 : hors périmètre).
4. **Pas de base de données** — les formulaires envoient les données à un service tiers (webhook), pas à un backend propriétaire.
5. **Pas d'API propriétaire** — le WhatsApp flottant utilise `wa.me`, les analytics utilisent un script tiers, les embeds vidéo sont des iframes.

**Un backend serait du over-engineering parce que** :

- Il ajouterait un serveur à maintenir (coût, uptime, sécurité) pour servir du contenu qui ne change pas.
- Il ajouterait de la latence TTFB (le serveur doit processer la requête) vs un CDN qui sert du HTML pré-rendu en ~50ms.
- Il nécessiterait un hosting Node.js/Python/PHP vs un hébergement statique gratuit ou quasi-gratuit (Vercel/Netlify).
- La seule raison d'ajouter un backend serait un CMS headless — exclu par les spécifications.

### Decision Log — Backend

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Pas de backend** — SSG pur déployé sur CDN edge | Aucun besoin runtime côté serveur identifié. Toutes les données sont statiques ou gérées par des services tiers (formulaires, analytics). TTFB minimal (~50ms CDN). Coût d'hébergement minimal. Surface d'attaque de sécurité réduite (pas de serveur exposé). | Backend Node.js (rejeté : aucun use case identifié, over-engineering). CMS headless type Strapi/Sanity (rejeté : le client n'édite pas le contenu, le développeur peut modifier le Markdown directement). Serverless functions pour formulaires (rejeté : les services tiers de formulaires sont plus simples et suffisants). | Si un blog est ajouté ultérieurement, Astro supporte nativement le Markdown/MDX — pas de backend nécessaire. Si un CMS est demandé plus tard, Astro a des intégrations officielles avec Sanity, Contentful, Storyblok — migration incrémentale possible. | Élevée — ajouter un backend ou un CMS headless est une extension, pas une réécriture. L'architecture SSG est le sous-ensemble minimal. |

---

## D) CMS & CONTENT MODEL

### Verdict : PAS DE CMS

**Justification** : le pack stratégie spécifie "site statique, éditable par un développeur (pas de CMS)". Le client HUGGO n'a pas besoin de modifier le contenu sans intervention développeur. Le contenu est du copy finalisé par l'Agent 3, pas du contenu éditorial qui évolue quotidiennement.

### Modèle de contenu minimal

Le contenu est structuré par page dans des fichiers i18n :

```
src/
├── content/
│   ├── fr/
│   │   ├── home.json        # Copy accueil FR
│   │   ├── retail.json      # Copy retail FR
│   │   ├── franchise.json   # Copy franchise FR
│   │   ├── collectivity.json
│   │   ├── how-it-works.json
│   │   ├── pricing.json
│   │   ├── about.json
│   │   ├── contact.json
│   │   └── common.json      # Header, footer, CTA, micro-copy partagé
│   └── en/
│       ├── home.json
│       ├── retail.json
│       ├── franchise.json
│       ├── collectivity.json
│       ├── how-it-works.json
│       ├── pricing.json
│       ├── about.json
│       ├── contact.json
│       └── common.json
```

Chaque fichier JSON contient le copy structuré par section (H1, H2, body, CTA labels, micro-texte, FAQ Q/R, SEO meta). Le développeur modifie ces fichiers et rebuild. Pas d'interface d'édition.

### Decision Log — CMS

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Pas de CMS** — contenu dans des fichiers JSON i18n versionnés dans le repo | Le client ne modifie pas le contenu sans développeur (spécification PRD). Les fichiers JSON sont versionnés (historique Git), validables (JSON Schema), et ne nécessitent aucune infrastructure supplémentaire. | Sanity (rejeté : overhead d'infrastructure et de coût pour un site à contenu fixe). Contentful (rejeté : même raison). Tina CMS (rejeté : intéressant car Git-based, mais ajoute une couche d'interface inutile pour un développeur qui peut éditer du JSON). WordPress headless (rejeté : disproportionné — serveur PHP + base MySQL pour 8 pages statiques). | Si le client demande un jour un CMS, Astro supporte nativement les sources de contenu externes (Sanity, Contentful, Storyblok). La migration consiste à remplacer les imports JSON par des appels API — les templates Astro restent identiques. | Élevée — le contenu JSON est le format le plus portable. |

---

## E) INTEGRATIONS PLAN

### 1. Formulaires

Le site a 2 formulaires distincts avec des destinations différentes.

#### Formulaire "Demander une démo" (page Contact + potentiellement modale)

| Aspect | Spec |
|--------|------|
| **Champs** | Nom (text, required), Entreprise (text, required), Email (email, required), Téléphone (tel, required), Type (select: "Commerçant" / "Distributeur / Réseau", required), Message (textarea, optional) |
| **Validation front** | HTML5 native (`required`, `type="email"`, `type="tel"`, `pattern`) + validation JS custom pour le format téléphone FR/international. Feedback visuel : bordure `feedback.error`, message sous le champ, shake animation (CSS Tier 1) |
| **Anti-spam** | Honeypot field (champ caché invisible par CSS, nom générique type `website`). Si rempli → silently discard. Pas de reCAPTCHA (friction utilisateur, GDPR, dependency Google). Si le honeypot s'avère insuffisant post-lancement, ajouter un challenge JS côté client (temps de remplissage < 3s → reject) |
| **Soumission** | `fetch()` vers un endpoint configurable (variable d'environnement `FORM_ENDPOINT_DEMO`). Pas de full-page redirect. Réponse inline : message de succès ou d'erreur |
| **Destination agnostique** | L'endpoint est configurable au déploiement : Formspree, Formspark, webhook Make/Zapier, endpoint email custom, API CRM. Le code n'est couplé à aucun service spécifique — il POST du JSON à une URL |
| **Notifications** | Dépendent du service choisi (email automatique, webhook Slack, notification CRM). Hors scope du site — configuré côté service tiers |
| **Stockage** | Hors scope du site — le service tiers gère le stockage (Formspree dashboard, CRM, Google Sheet via webhook) |
| **Message de succès FR** | "Merci ! Nous vous rappelons sous 24 heures." |
| **Message de succès EN** | "Thank you! We'll call you within 24 hours." |

#### Formulaire "Nous contacter" (page Contact)

| Aspect | Spec |
|--------|------|
| **Champs** | Nom (text, required), Entreprise (text, required), Email (email, required), Message (textarea, required) |
| **Validation front** | Identique au formulaire démo |
| **Anti-spam** | Identique (honeypot) |
| **Soumission** | `fetch()` vers `FORM_ENDPOINT_CONTACT` (endpoint séparé pour routing distinct) |
| **Destination** | Même architecture agnostique. Endpoint séparé pour router vers l'équipe commerciale distributeurs |

#### Decision Log — Formulaires

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Soumission agnostique via variable d'environnement** | Le pack stratégie spécifie "destination agnostique (configurable au déploiement)". Les variables d'environnement permettent de changer le service de formulaire sans modification du code. | Formspree directement codé (rejeté : couplage fort, le client pourrait vouloir un CRM ou un webhook). Netlify Forms (rejeté : couple le formulaire à l'hébergeur). API backend custom (rejeté : pas de backend — cf. section C). | Si le service tiers tombe, les soumissions sont perdues. Mitigation : le message d'erreur guide l'utilisateur vers le WhatsApp flottant comme fallback. | Élevée — changer l'endpoint = modifier une variable d'environnement et redéployer (~2 min). |
| **Honeypot anti-spam** (pas de reCAPTCHA) | reCAPTCHA (1) ajoute ~150 KB de JS Google, (2) est un tracker (GDPR), (3) dégrade l'UX (friction puzzle). Un honeypot est invisible, zero-JS, zero-friction. Le trafic d'un site vitrine B2B de niche est faible — le spam automatisé massif est improbable. | reCAPTCHA v3 (rejeté : poids JS, GDPR, score invisible qui peut bloquer des vrais utilisateurs). hCaptcha (rejeté : même problème de friction). Turnstile Cloudflare (acceptable alternative si honeypot insuffisant — léger, privacy-friendly, mais ajoute une dépendance). | Si le spam dépasse le honeypot, escalader vers Cloudflare Turnstile (JS léger, privacy-friendly) sans modifier l'architecture du formulaire. | Élevée — ajouter Turnstile = ajouter un script + un champ hidden, ~30 min de travail. |

### 2. Analytics

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Plausible Analytics** (self-hosted ou cloud) | (1) Script < 1 KB vs ~28 KB pour GA4. (2) Pas de cookies → pas de bannière consentement GDPR (conforme par design). (3) Dashboard simple, suffisant pour les 12 événements du tracking plan. (4) Privacy-first — pas de transfert de données vers Google. (5) Le PRD spécifie "GA4 ou Plausible — Agent 5 décide" : la contrainte GDPR et le budget JS tranchent en faveur de Plausible. | GA4 (rejeté : 28 KB script, nécessite une bannière consentement cookies GDPR, tracking bloqué par ~40% des adblockers en France — données incomplètes). Fathom (acceptable alternative : même philosophie que Plausible, mais plus cher). Matomo self-hosted (rejeté : nécessite un serveur — pas de backend). | Plausible est un service plus petit que Google — risque de discontinuité (faible : open-source, self-hostable). Si le client exige GA4 (rapport avec agence marketing existante), la migration est simple : remplacer le script Plausible par le tag GA4 + ajouter une bannière consentement. | Élevée — remplacer un script analytics = modifier 1 fichier. Les noms d'événements custom sont identiques entre les deux services. |

#### Tracking plan — implémentation des 12 événements

| Événement (pack stratégie) | Trigger technique | Plausible custom event |
|---------------------------|-------------------|----------------------|
| `demo_form_submit` | Réponse 2xx du `fetch()` formulaire démo | `plausible('demo_form_submit', {props: {type: field_value, page: location.pathname}})` |
| `contact_form_submit` | Réponse 2xx du `fetch()` formulaire contact | `plausible('contact_form_submit', {props: {page: location.pathname}})` |
| `cta_demo_click` | `click` sur tout bouton CTA "Demander une démo" | `plausible('cta_demo_click', {props: {page: location.pathname, position: data-attr}})` |
| `cta_contact_click` | `click` sur CTA "Nous contacter" | `plausible('cta_contact_click', {props: {page: location.pathname, position: data-attr}})` |
| `whatsapp_click` | `click` sur bouton WhatsApp flottant | `plausible('whatsapp_click', {props: {page: location.pathname}})` |
| `case_study_download` | `click` sur lien PDF cas client | `plausible('case_study_download', {props: {document: filename}})` |
| `newsletter_signup` | Soumission formulaire newsletter (si ajouté) | `plausible('newsletter_signup', {props: {page: location.pathname}})` |
| `page_view` | Automatique (Plausible le track nativement) | Automatique — inclut page_path |
| `scroll_depth` | IntersectionObserver aux seuils 25/50/75/100% | `plausible('scroll_depth', {props: {page: location.pathname, depth: '75'}})` |
| `vertical_click` | `click` sur liens/cards Retail/Franchise/Collectivity | `plausible('vertical_click', {props: {vertical: 'retail', source: location.pathname}})` |
| `language_switch` | `click` sur toggle FR/EN | `plausible('language_switch', {props: {from: 'fr', to: 'en'}})` |
| `pricing_tier_view` | IntersectionObserver sur chaque card palier | `plausible('pricing_tier_view', {props: {tier: 'smart'}})` |

### 3. Logo bar CSS-only

| Aspect | Spec |
|--------|------|
| **Nombre de logos** | ~43-50 logos issus de HubRise (cf. PRD §8.4) |
| **Format** | SVG préféré (vecteur, léger, qualité parfaite). Fallback PNG transparent si SVG non disponible |
| **Traitement** | Grayscale filter CSS (`filter: grayscale(1)`) — pas de conversion manuelle en B&W. Les fichiers source restent en couleur |
| **Taille uniforme** | Hauteur fixe 40px, largeur auto. Gap 24px entre logos |
| **Animation** | CSS `@keyframes` : `transform: translateX(-33.33%)` en boucle infinie, durée 30s, `timing-function: linear`. HTML dupliqué 3x pour boucle seamless |
| **Reduced motion** | `prefers-reduced-motion: reduce` → animation arrêtée, logos fixes visibles |
| **Container** | Overflow hidden, pleine largeur (pas de `max-width` container) |
| **Performance** | Composited only (transform). Pas de JS. Les logos SVG sont inlinés ou chargés via `<img>` avec `loading="lazy"` sauf les premiers visibles |

### 4. WhatsApp flottant

| Aspect | Spec |
|--------|------|
| **Comportement** | Bouton sticky, position fixed, bas-droite 24px, z-index 50, toutes pages |
| **Lien** | `https://wa.me/{WHATSAPP_NUMBER}?text={prefilled_message}` — numéro configurable via variable d'environnement `WHATSAPP_NUMBER` |
| **Visuels** | Fond #25D366 (vert WhatsApp officiel), icône WhatsApp SVG blanc, 56x56px, radius full, shadow md |
| **Accessibilité** | `aria-label="Nous contacter sur WhatsApp"` (FR) / `"Contact us on WhatsApp"` (EN). `target="_blank"` + `rel="noopener noreferrer"` |
| **Animations** | Hover: scale(1.05) + shadow lg, 150ms ease-out. Pressed: scale(0.95) + shadow sm. Reduced motion : pas de scale, changement de shadow uniquement |

### 5. Vidéo démo

| Aspect | Spec |
|--------|------|
| **Placement** | Page "Comment ça marche", section 5 |
| **Embed** | YouTube ou Vimeo iframe, lazy-loadé via `loading="lazy"` ou intersection observer |
| **Façade pattern** | Afficher un poster image (thumbnail) + bouton play custom. Le iframe ne charge que au clic — réduit le LCP et le poids initial de ~500 KB (YouTube player) |
| **Aspect ratio** | 16:9, conteneur responsive `aspect-ratio: 16/9` |
| **Accessibilité** | `title` sur l'iframe. Contrôles natifs du player |

### 6. SEO technique

| Aspect | Spec |
|--------|------|
| **Sitemap XML** | Généré automatiquement par `@astrojs/sitemap`. Inclut toutes les pages FR + EN avec `hreflang` |
| **robots.txt** | Autoriser tout, pointer vers le sitemap. Bloquer les pages placeholder (legal, privacy, blog) tant qu'elles n'ont pas de contenu |
| **Schema.org** | `Organization` (HUGGO, filiale d'Atidgo), `WebSite` (search action), `FAQPage` sur chaque page avec FAQ, `BreadcrumbList` sur les pages internes |
| **Meta tags** | Générés depuis les fichiers i18n : `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<link rel="alternate" hreflang="fr">`, `<link rel="alternate" hreflang="en">` |
| **Open Graph** | `og:title`, `og:description`, `og:image` (OG image 1200x630 à produire), `og:url`, `og:type: website`, `og:locale: fr_FR` / `en_US` |
| **Twitter Card** | `twitter:card: summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` |

### Decision Log — Intégrations

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Logo bar CSS-only avec grayscale filter** | Le PRD (§8.3) et la motion strategy spécifient CSS-only scroll. Le grayscale filter CSS est plus maintenable que des fichiers PNG pré-convertis en B&W — les logos source restent en couleur. | Swiper.js pour le scroll (rejeté : interdit par la motion strategy — pas de carousel JS, CSS-only scroll). PNG B&W pré-convertis (rejeté : double maintenance, perte de l'original couleur). | `filter: grayscale(1)` est supporté à 97%+ des navigateurs. Aucun risque notable. | Élevée. |
| **YouTube/Vimeo façade pattern** | Le player YouTube charge ~500 KB de JS. Le façade pattern (poster + play button custom) réduit le poids initial à ~0 KB — le player ne charge qu'au clic utilisateur. Compatible avec la contrainte LCP < 2.5s. | Embed direct sans façade (rejeté : +500 KB JS au chargement initial sur /how-it-works). Hébergement vidéo self-hosted (rejeté : bande passante coûteuse, pas de CDN vidéo — YouTube/Vimeo sont des CDN gratuits). | Le poster image doit être fourni manuellement ou extrait via l'API YouTube. Si la vidéo est hébergée en privé, l'API peut ne pas fournir le thumbnail. | Élevée — retirer le façade = supprimer le poster et charger l'iframe directement. |
| **Plausible Analytics** | Script < 1 KB, no-cookie, GDPR-compliant sans bannière, 12 événements custom suffisants. cf. section 2 ci-dessus. | GA4 cf. ci-dessus. | cf. ci-dessus. | Élevée. |

---

## F) TECH EXECUTION BRIEF

### Rendu SSG par page

| Page | Route FR | Route EN | Tier | JS eager | JS lazy |
|------|----------|----------|------|----------|---------|
| Accueil | `/fr/` | `/en/` | 3 | 33 KB (GSAP + ScrollTrigger + Lenis) | 150-300 KB (Spline, desktop-only) |
| Retail | `/fr/retail` | `/en/retail` | 2 | 33 KB | 0 |
| Franchise | `/fr/franchise` | `/en/franchise` | 2 | 33 KB | 0 |
| Collectivity | `/fr/collectivity` | `/en/collectivity` | 2 | 33 KB | 0 |
| Comment ça marche | `/fr/how-it-works` | `/en/how-it-works` | 2 | 33 KB | ~500 KB (YouTube player, uniquement au clic via façade) |
| Tarifs | `/fr/pricing` | `/en/pricing` | 2 | 33 KB | 0 |
| À propos | `/fr/about` | `/en/about` | 2 | 33 KB | 0 |
| Contact | `/fr/contact` | `/en/contact` | 1 | ~2 KB (form validation + analytics events) | 0 |

### Structure de repo

```
huggo-site/
├── .env.example                  # Variables d'environnement (FORM_ENDPOINT_DEMO, FORM_ENDPOINT_CONTACT, WHATSAPP_NUMBER, PLAUSIBLE_DOMAIN)
├── .env                          # Variables locales (gitignored)
├── astro.config.mjs              # Config Astro : i18n, sitemap, tailwind, image optimization
├── tailwind.config.mjs           # Tokens → Tailwind theme (colors, spacing, typography, radius, shadows)
├── tokens.json                   # Source of truth W3C Design Tokens (copié depuis Agent 4)
├── scripts/
│   └── tokens-to-css.mjs         # Build script : tokens.json → CSS custom properties (fallback pour raw CSS usage)
├── public/
│   ├── fonts/                    # Variable fonts self-hosted (Plus Jakarta Sans, DM Sans, JetBrains Mono)
│   ├── logos/                    # ~50 logos HubRise (SVG/PNG), logos partenaires tech
│   ├── images/                   # Images optimisées (WebP + fallback JPEG), OG images, mascotte
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── fr/                   # Copy JSON par page (FR)
│   │   └── en/                   # Copy JSON par page (EN)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML head, fonts preload, analytics, dark mode script, skip-to-content
│   │   └── PageLayout.astro      # Header + main + footer + WhatsApp floating button
│   ├── components/
│   │   ├── global/
│   │   │   ├── Header.astro      # Navigation sticky, compact au scroll, toggle langue, toggle dark mode
│   │   │   ├── Footer.astro      # 4 colonnes, liens, Atidgo mention, copyright
│   │   │   ├── WhatsAppButton.astro  # Bouton flottant sticky
│   │   │   ├── PreFooterCTA.astro    # Bande CTA pré-footer (shared across all pages)
│   │   │   └── SEOHead.astro         # Meta tags, OG, Twitter Card, Schema.org, hreflang
│   │   ├── sections/
│   │   │   ├── HeroHome.astro        # Hero accueil (H1, sous-titre, CTAs, baseline)
│   │   │   ├── HeroPage.astro        # Hero pages internes (générique)
│   │   │   ├── MetricsSection.astro  # Chiffres-clés avec counter animation
│   │   │   ├── LogoBar.astro         # CSS-only scroll infini ~50 logos
│   │   │   ├── BenefitsGrid.astro    # 4 cards bénéfices
│   │   │   ├── VerticalsCards.astro   # 3 cards Retail/Franchise/Collectivity
│   │   │   ├── StepsSection.astro    # 4 étapes onboarding (résumé ou détail)
│   │   │   ├── FaqSection.astro      # Accordion FAQ
│   │   │   ├── TestimonialBlock.astro # Placeholder témoignage
│   │   │   ├── PricingTiers.astro    # 4 paliers sans prix
│   │   │   ├── VideoEmbed.astro      # YouTube/Vimeo façade pattern
│   │   │   ├── PartnersLogos.astro   # Logos partenaires tech
│   │   │   ├── RSESection.astro      # Engagements RSE
│   │   │   └── MascotSection.astro   # Mascotte + CTA WhatsApp
│   │   ├── ui/
│   │   │   ├── Button.astro          # Primary, Secondary, Tertiary variants
│   │   │   ├── Card.astro            # Verticale, Palier, Bénéfice variants
│   │   │   ├── Badge.astro
│   │   │   ├── FormInput.astro       # Input, Select, Textarea
│   │   │   └── Accordion.astro       # FAQ item (details/summary)
│   │   └── islands/
│   │       ├── SplineHero.tsx        # React island — Spline 3D smartphone (lazy, desktop-only, WebGL check)
│   │       └── CounterAnimation.tsx  # React island — GSAP counter animation (ou vanilla JS)
│   ├── pages/
│   │   ├── fr/
│   │   │   ├── index.astro           # Accueil FR
│   │   │   ├── retail.astro
│   │   │   ├── franchise.astro
│   │   │   ├── collectivity.astro
│   │   │   ├── how-it-works.astro
│   │   │   ├── pricing.astro
│   │   │   ├── about.astro
│   │   │   └── contact.astro
│   │   └── en/
│   │       ├── index.astro           # Home EN
│   │       ├── retail.astro
│   │       ├── franchise.astro
│   │       ├── collectivity.astro
│   │       ├── how-it-works.astro
│   │       ├── pricing.astro
│   │       ├── about.astro
│   │       └── contact.astro
│   ├── styles/
│   │   ├── global.css                # @tailwind directives, @font-face, tokens CSS custom properties, reduced-motion overrides
│   │   ├── animations.css            # CSS-only animations (fade-up, logo bar, accordion, header compact, button hover)
│   │   └── dark-mode.css             # [data-theme="dark"] token overrides
│   └── utils/
│       ├── gsap-init.ts              # GSAP + ScrollTrigger registration, reduced-motion check, scroll-triggered animations factory
│       ├── lenis-init.ts             # Lenis smooth scroll init, reduced-motion check, cleanup
│       ├── form-handler.ts           # fetch() POST, honeypot check, success/error handling
│       ├── analytics.ts              # Plausible custom events helper
│       ├── dark-mode.ts              # Toggle logic, localStorage persistence, system preference detection
│       ├── i18n.ts                   # Helper pour récupérer le contenu par locale
│       └── webgl-detect.ts           # WebGL detection pour Spline fallback
├── package.json
├── tsconfig.json
└── README.md                        # Setup instructions (not auto-generated — for dev team)
```

### Budgets perf alignés sur PRD §15

| Métrique | Cible PRD | Budget technique détaillé |
|----------|-----------|--------------------------|
| **LCP < 2.5s** | Le LCP est le H1 text (rendu SSG, pas de JS blocker) ou l'image hero (WebP, preloaded, srcset). Le Spline 3D charge APRÈS le LCP via intersection observer. Fonts preloaded (2 fichiers variable). CSS inliné (critical path) ou preloaded |
| **INP < 200ms** | Main thread jamais bloqué > 200ms. GSAP utilise requestAnimationFrame (non-blocking). Les event handlers (click CTA, form submit, accordion toggle) sont synchrones et rapides (< 10ms). Pas de layout thrashing (batch DOM reads/writes) |
| **CLS < 0.1** | Toutes les images ont `width` et `height` explicites (ou `aspect-ratio`). Fonts ont `font-display: swap` + `size-adjust` pour minimiser le reflow. Le Spline island a une taille réservée (placeholder skeleton). L'accordion utilise `max-height` avec valeur CSS (pas de JS layout calc au runtime). Le header compact a une hauteur fixe (72px → 56px, transition composited) |
| **Lighthouse Perf > 90** | JS eager total : 33 KB (GSAP + ScrollTrigger + Lenis) sur les pages Tier 2. 2 KB (form + analytics) sur Contact. 0 KB framework (Astro). CSS total : < 20 KB (Tailwind purged). Fonts : < 150 KB (2 variable fonts preloaded, 1 lazy). Images : WebP, srcset, lazy-loaded (sauf hero). Total transfert first load : < 300 KB sur les pages internes |
| **Lighthouse A11y > 95** | Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`). Skip-to-content premier focusable. Focus ring visible (2px orange, offset 2px). ARIA labels sur tous les éléments interactifs (WhatsApp button, hamburger, toggle langue, toggle dark mode). Contraste 4.5:1 vérifié sur toutes les combinaisons token. `alt` descriptifs sur images fonctionnelles, `alt=""` sur décoratives. `aria-hidden="true"` sur le canvas Spline 3D. FAQ avec `<details>/<summary>` natif ou `aria-expanded` |

### Deployment

| Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|----------|-----------|----------------------|--------|---------------|
| **Vercel** | (1) Intégration Astro officielle et optimisée (`@astrojs/vercel`). (2) Edge network global — TTFB < 50ms worldwide. (3) Preview deployments automatiques par PR (utile pour review Agent 6 QA). (4) Variables d'environnement via dashboard + CLI. (5) Headers de sécurité configurables via `vercel.json`. (6) Analytics edge (optionnel, complémentaire à Plausible). (7) Images optimization edge (build-time via Astro `<Image>` + edge transform). (8) Free tier suffit largement pour un site vitrine avec < 100K visites/mois. | Netlify (acceptable alternative : même modèle edge/CDN, même free tier. Rejeté pour une raison mineure : l'intégration Astro sur Vercel est plus mature et le DX des preview deploys est supérieur). GitHub Pages (rejeté : pas de preview deploys, pas de variables d'environnement, pas de headers configurables, pas d'edge functions si besoin futur). AWS Amplify (rejeté : config plus complexe, pas de preview deploys aussi simples). | Vendor lock-in minimal — Astro génère du HTML statique. Migrer de Vercel à Netlify = changer 1 fichier de config (adapter) + reconfigurer les variables d'environnement. Si Vercel change ses prix, migration en < 1 jour. | Très élevée — le site est du HTML/CSS/JS statique. N'importe quel CDN ou hébergeur statique peut le servir. |

#### Configuration Vercel

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/logos/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=2592000" }
      ]
    }
  ],
  "redirects": [
    { "source": "/", "destination": "/fr/", "statusCode": 302 }
  ]
}
```

### Patterns Tier 3 — implémentation détaillée

#### GSAP islands pattern

Les animations GSAP ne sont pas initialisées globalement. Chaque section qui utilise du GSAP importe un helper factory :

```typescript
// Pattern conceptuel (src/utils/gsap-init.ts)
// 1. Vérifier prefers-reduced-motion
// 2. Si reduced motion → ne rien initialiser, éléments visibles par défaut (opacity 1, transform none)
// 3. Sinon → enregistrer ScrollTrigger, créer les animations ciblées par section
// 4. Cleanup : chaque animation a un ScrollTrigger.kill() au unmount (pour les islands React)
```

Les éléments animés ont `opacity: 0; transform: translateY(20px)` en CSS initial. Si JS ne charge pas ou reduced-motion est actif, un fallback CSS reset l'état : `@media (prefers-reduced-motion: reduce) { .animate { opacity: 1; transform: none; } }` + `<noscript><style>.animate { opacity: 1; transform: none; }</style></noscript>`.

#### ScrollTrigger cleanup

Chaque ScrollTrigger est stocké dans une référence et `kill()` au démontage du composant (ou au changement de page si SPA-like navigation est ajoutée). Pas de ScrollTrigger orphelin.

#### Lenis sync

Lenis (smooth scroll) est initialisé une seule fois dans `BaseLayout.astro` via un `<script>` inline. Il est synchronisé avec ScrollTrigger via `ScrollTrigger.scrollerProxy()` ou le pattern `lenis.on('scroll', ScrollTrigger.update)`. Si `prefers-reduced-motion: reduce` est détecté, Lenis n'est pas initialisé — le scroll natif est utilisé.

#### Spline lazy + WebGL detection + fallback

```
1. Page accueil se charge → HTML statique (H1, sous-titre, CTAs, baseline) rendu immédiatement
2. IntersectionObserver observe le conteneur hero
3. Quand le hero est visible ET viewport >= 768px :
   a. Vérifier WebGLRenderingContext
   b. Si WebGL absent → afficher fallback image statique (WebP, déjà dans le <picture>)
   c. Si WebGL présent → import dynamique de @splinetool/react-spline
   d. Afficher loading state ("Chargement..." en type.body-sm + skeleton)
   e. Au load complet du modèle → fade-in 800ms
4. Sur mobile (< 768px) : jamais de Spline, fallback image statique toujours affichée
5. prefers-reduced-motion: reduce → Spline chargé mais statique (pas de rotation au scroll/hover), ou fallback image
```

Le conteneur Spline a des dimensions réservées pour éviter le CLS :
- Desktop : largeur 50% du hero (6 colonnes grid), hauteur auto avec aspect-ratio réservé
- Une image placeholder basse résolution (blur-up) occupe l'espace en attendant le chargement 3D

### Risques + mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|------------|--------|-----------|
| **Spline runtime trop lourd pour Lighthouse mobile ≥ 85** | Moyenne | Élevé — downgrade à Tier 2 si confirmé | Le Spline est lazy desktop-only. Mobile ne charge jamais le runtime. Le test Lighthouse mobile utilise le fallback image. Si le score desktop < 85, downgrade à Tier 2 + image statique |
| **GSAP license** | Faible | Moyen — GSAP est gratuit pour les sites non-payants (les utilisateurs ne paient pas pour accéder au site), mais la license NO CHARGE nécessite vérification | Vérifier que le site vitrine HUGGO qualifie pour la license gratuite GSAP (Standard License). Si non, GSAP Business License ~$150/an. Alternative Tier 2 : Motion One (open source, API similaire) ou CSS animations pures (downgrade) |
| **Variable fonts non disponibles en self-hosted** | Faible | Faible — fallback system-ui | Plus Jakarta Sans, DM Sans et JetBrains Mono sont toutes disponibles en variable font sur Google Fonts. Téléchargement et self-hosting confirmés possibles. Fallback CSS : `system-ui, sans-serif` et `monospace` |
| **Plausible bloqué par certains adblockers** | Moyenne | Faible — données incomplètes mais suffisantes pour un site vitrine B2B | Plausible est bloqué par ~15% des adblockers (vs ~40% pour GA4). Mitigation optionnelle : proxy le script Plausible via un sous-domaine custom (`/js/script.js` → proxy vers Plausible CDN) |
| **Formulaire spam malgré le honeypot** | Moyenne | Moyen — leads polluées | Escalader vers Cloudflare Turnstile (< 1 jour d'implémentation). Le WhatsApp flottant est une alternative de contact zéro-spam |
| **Oklch non supporté sur navigateurs anciens** | Faible (~3% des navigateurs FR en 2026) | Faible — fallback hex fonctionnel | `@supports (color: oklch(0 0 0))` avec fallback hex fourni dans tokens.json `$extensions.fallback_hex`. Les couleurs sont visuellement identiques en sRGB pour les cas d'usage standards |
| **Modèle Spline non fourni par le client** | Élevée | Bloquant pour le Tier 3 hero | Le modèle doit être créé dans l'éditeur Spline (outil tiers). Si non disponible au moment du développement, implémenter le Tier 2 + image statique et ajouter le Spline island quand le modèle est prêt (architecture island le permet sans refactoring) |
| **Logos HubRise non fournis en SVG** | Moyenne | Faible — PNG transparent acceptable | Préparer le pipeline pour accepter SVG et PNG. Optimiser les PNG via `sharp` ou `imagemin` au build. Taille uniforme forcée par CSS (height 40px, width auto) |

---

## READY TO CODE CHECKLIST

### Pré-requis bloquants (STOP si manquant)

- [ ] `tokens.json` disponible et validé (Agent 4) — **DISPONIBLE**
- [ ] Copy v1 complet FR + EN (Agent 3) — **DISPONIBLE**
- [ ] Motion strategy avec tier confirmé (Agent 4) — **DISPONIBLE (Tier 3)**
- [ ] Component handoff avec états et tokens par composant (Agent 4) — **DISPONIBLE**
- [ ] UX Architecture avec page specs et sitemap (Agent 2) — **DISPONIBLE**
- [ ] Pack stratégie avec tracking plan et conversion map (Agent 1) — **DISPONIBLE**
- [ ] Design system v1 avec responsive specs (Agent 4) — **DISPONIBLE**

### Assets bloquants (développement peut commencer, assets intégrés incrémentalement)

- [ ] Modèle Spline 3D smartphone — `[À PRODUIRE dans Spline editor]`
- [ ] Image fallback smartphone (WebP 800x600 + 1600x1200 @2x) — `[À PRODUIRE]`
- [ ] ~50 logos HubRise (SVG préféré) — `[À TÉLÉCHARGER + OPTIMISER]`
- [ ] Logos partenaires tech (Google Cloud, ACSEO, Centrale Paris, Orisha, Contodeo) — `[À TÉLÉCHARGER]`
- [ ] Logo HUGGO en SVG (versions fond vert, fond blanc, fond transparent) — `[À CONVERTIR depuis JPEG]`
- [ ] OG Image 1200x630 — `[À PRODUIRE]`
- [ ] Numéro WhatsApp Business — `[À FOURNIR par le client]`
- [ ] Endpoint formulaires (Formspree/webhook/CRM) — `[À CONFIGURER au déploiement]`
- [ ] Domaine (huggo.fr, huggo.ai, etc.) — `[À DÉCIDER par le client]`

### Stack technique confirmée

| Composant | Choix | Version min |
|-----------|-------|------------|
| Framework | Astro | 5.x |
| CSS | Tailwind CSS | 4.x |
| Animations core | GSAP + ScrollTrigger | 3.12+ |
| Smooth scroll | Lenis | 1.0+ |
| 3D (hero accueil) | @splinetool/react-spline | 2.2+ |
| Analytics | Plausible | cloud ou self-hosted |
| Hébergement | Vercel | — |
| Fonts | Plus Jakarta Sans + DM Sans + JetBrains Mono (variable, self-hosted) | — |
| Node.js (build) | Node.js | 20 LTS |

### Commandes de démarrage

```bash
# Init projet
npm create astro@latest huggo-site -- --template minimal
cd huggo-site

# Dépendances
npm install @astrojs/tailwind @astrojs/sitemap @astrojs/react
npm install tailwindcss@next
npm install gsap lenis
npm install @splinetool/react-spline react react-dom

# Dev
npm run dev        # http://localhost:4321
npm run build      # Build SSG → dist/
npm run preview    # Preview build local

# Deploy
npx vercel         # Deploy preview
npx vercel --prod  # Deploy production
```

### Ordre d'implémentation recommandé

1. **Setup** : Astro + Tailwind + tokens pipeline + fonts + dark mode + i18n routing
2. **Layout** : BaseLayout + PageLayout + Header (sticky + compact) + Footer + WhatsApp button
3. **Composants UI** : Button, Card, Badge, FormInput, Accordion, Section
4. **Page Contact** (Tier 1, la plus simple) : formulaires + validation + soumission agnostique
5. **Pages internes** (Tier 2) : Retail, Franchise, Collectivity, How-it-works, Pricing, About — sections réutilisables
6. **Animations Tier 2** : GSAP init + ScrollTrigger fade-ups + counters + Lenis smooth scroll
7. **Logo bar** : CSS-only scroll infini
8. **Page Accueil** (Tier 3) : hero avec Spline island lazy + toutes les sections
9. **SEO** : Sitemap, robots.txt, Schema.org, meta tags, OG
10. **Analytics** : Plausible script + 12 événements custom
11. **QA** : Lighthouse audit, responsive check, dark mode, reduced motion, a11y

---

## DECISION LOG COMPLET

| # | Décision | Rationale | Alternatives rejetées | Risque | Réversibilité |
|---|----------|-----------|----------------------|--------|---------------|
| 1 | **Astro 5** (framework) | 0 KB JS par défaut. Islands architecture isolée pour Spline. SSG natif. Marge Lighthouse maximale pour Tier 3. | Next.js (+80 KB runtime inutile), Nuxt (+50 KB runtime inutile), Webflow (incompatible Tier 3) | Écosystème plus jeune | Moyenne — templates à réécrire si migration |
| 2 | **Tailwind CSS 4** | Utility-first, purge CSS mort, responsive mobile-first natif, dark mode `dark:` variant, intégration Astro officielle | CSS modules (verbeux), vanilla CSS (CSS mort), UnoCSS (écosystème plus petit) | Courbe d'apprentissage si équipe non familière | Élevée (CSS compilé) |
| 3 | **Pas de backend** | Aucun contenu dynamique, pas de CMS, pas d'auth, pas de DB. SSG + CDN edge = TTFB ~50ms, coût minimal, surface d'attaque réduite | Backend Node.js (over-engineering), CMS headless (inutile — contenu fixe) | Si blog ajouté : Astro supporte MDX nativement, pas de backend nécessaire | Élevée (extension, pas réécriture) |
| 4 | **Pas de CMS** | Le client ne modifie pas le contenu sans développeur (spécification PRD). JSON versionné suffit | Sanity, Contentful (overhead infra), Tina CMS (couche inutile) | Si le client change d'avis : Astro a des intégrations CMS headless prêtes | Élevée (JSON portable) |
| 5 | **Plausible Analytics** | < 1 KB, no-cookie, GDPR sans bannière, 12 événements custom suffisants, pas de transfert données Google | GA4 (28 KB, cookies, bannière GDPR, bloqué par adblockers) | Plausible service plus petit que Google. Self-hosting possible | Élevée (remplacer 1 script) |
| 6 | **Vercel** (hébergement) | Edge CDN global, preview deploys par PR, intégration Astro officielle, free tier suffisant | Netlify (acceptable — intégration légèrement moins mature), GitHub Pages (pas de preview deploys, pas de env vars) | Vendor lock-in minimal (HTML statique portable) | Très élevée (migrer en < 1 jour) |
| 7 | **Honeypot anti-spam** | Zero JS, zero friction, GDPR clean. Trafic B2B niche = spam massif improbable | reCAPTCHA (150 KB, GDPR), hCaptcha (friction), Turnstile (escalation si nécessaire) | Si spam dépasse honeypot : escalader vers Turnstile (~30 min) | Élevée |
| 8 | **Self-hosted variable fonts** | Contrôle FOIT/FOUT, GDPR (pas de requête Google Fonts), performance (preload ciblé) | Google Fonts CDN (requête DNS externe, GDPR France) | Poids ~200 KB total 3 fonts. Mitigation : preload 2 fonts above-the-fold uniquement | Élevée |
| 9 | **Formulaires agnostiques** (variable d'env endpoint) | Pack stratégie : "destination agnostique". Endpoint configurable sans modification code | Formspree hardcodé (couplage), Netlify Forms (couplage hébergeur) | Service tiers tombe : WhatsApp flottant comme fallback | Élevée (changer = modifier 1 env var) |
| 10 | **YouTube/Vimeo façade pattern** | Poster + play button custom, player ne charge qu'au clic (~500 KB économisés au load initial) | Embed direct (500 KB JS au chargement), self-hosted vidéo (bande passante coûteuse) | Poster image à fournir manuellement | Élevée (retirer façade = direct embed) |
| 11 | **CSS grayscale filter** (logo bar) | Plus maintenable que des PNG B&W pré-convertis. Source logos restent en couleur. `filter: grayscale(1)` supporté 97%+ | PNG B&W manuels (double maintenance) | Aucun risque notable | Élevée |
| 12 | **Oklch + fallback sRGB** | Source de vérité Oklch (tokens.json). Fallback hex via `@supports`. Gamut P3-ready pour écrans modernes | sRGB uniquement (perd la précision Oklch), Oklch sans fallback (casse ~3% navigateurs) | ~3% navigateurs FR sans Oklch → fallback hex invisible pour l'utilisateur | Élevée |
