# HUGGO Site

Site marketing Astro + React Three Fiber pour HUGGO (messagerie WhatsApp B2B).

## Tech Stack

- **Astro** — pages FR/EN dans `huggo-site/src/pages/{fr,en}/`
- **React Three Fiber** — composants 3D dans `huggo-site/src/components/react/`
- **GSAP ScrollTrigger** — via `huggo-site/src/components/animations/gsap-init.ts`
- **Tailwind CSS v4** — variables CSS dans `global.css`
- **i18n maison** — traductions dans `huggo-site/src/i18n/`

## Commandes

```bash
cd huggo-site
npm run dev      # Serveur dev → localhost:4321
npm run build    # Build production
npm run preview  # Prévisualiser le build
```

## Fichiers critiques

- `src/components/react/HeroPhone3D.tsx` — téléphone 3D hero, animation scroll via GLB animé
- `src/components/react/HeroPhoneZoom.tsx` — référence architecturale pour les patterns scroll + R3F
- `src/components/animations/gsap-init.ts` — point d'entrée unique pour GSAP
- `src/styles/global.css` — variables CSS (`--cream`, `--sage`, `--forest`…)

## Règles générales

- Utiliser `trash` pour toute suppression de fichiers
- Les pages FR et EN sont miroirs — appliquer toute modification aux deux

## Règles 3D

Lire le skill correspondant avant tout travail 3D :

- **React Three Fiber** → `.claude/skills/r3f-best-practices/SKILL.md`
- **Three.js pur** → `.claude/skills/three-best-practices/SKILL.md`
- **Blender** → le skill `blender-*` adapté à la tâche (auto-découverts, complètent le BlenderMCP)

### Patterns établis (respecter tel quel)

- `progressRef` (MutableRefObject<number>) pour le scroll progress — zéro re-render
- `frameloop="demand"` + `invalidate()` — rendu à la demande uniquement
- Damping dans `useFrame` : `smoothRef.current += (target - smoothRef.current) * factor`
- Importer GSAP uniquement via `import('../animations/gsap-init')`
- Utiliser des refs dans `useFrame`, pas de `setState`
- Consulter `HeroPhoneZoom.tsx` comme référence avant de créer un nouveau composant 3D
