---
globs: huggo-site/src/components/react/**/*.tsx
description: Pattern pour animer un modèle Blender au scroll via AnimationMixer scrubbing dans R3F
alwaysApply: false
---

# Animation scroll-driven avec un GLB Blender

Quand un GLB contient des animations bakées depuis Blender, utiliser **AnimationMixer scrubbing** piloté par le scroll progress — pas de calculs JS manuels de position/rotation.

## Pipeline Blender → Web

1. Baker toutes les animations (loc/rot/scale) dans Blender
2. Exporter en GLB avec "Bake All Actions" coché
3. Le GLTF loader gère la conversion Z-up → Y-up automatiquement

## Setup AnimationMixer

```tsx
const { scene, animations } = useGLTF('/models/mon_anim.glb');

// Dans useEffect :
const mixer = new THREE.AnimationMixer(scene);
for (const clip of animations) {
  const action = mixer.clipAction(clip);
  action.setLoop(THREE.LoopOnce, 1);
  action.clampWhenFinished = true;
  action.play();
}
clipDurationRef.current = Math.max(...animations.map(c => c.duration));
mixer.setTime(0);
```

## Scrubbing dans useFrame

```tsx
const animProgress = clamp(scrollProgress / 0.85, 0, 1);
mixer.setTime(animProgress * clipDurationRef.current);
```

`mixer.setTime(t)` repositionne l'animation à un temps absolu — fonctionne en avant ET en arrière.

## Sync caméra Blender → R3F

Si le GLB contient une caméra animée (ex: `ZoomCamera`) :

```tsx
blenderCam.updateWorldMatrix(true, false);
camera.position.setFromMatrixPosition(blenderCam.matrixWorld);
camera.quaternion.setFromRotationMatrix(blenderCam.matrixWorld);
```

La caméra Blender reste dans le scene graph (les tracks ont besoin de leur cible) mais ne rend pas visuellement.

## `frameloop="demand"` + invalidation

Avec `frameloop="demand"`, `useFrame` ne tourne que quand `invalidate()` est appelé. Le ScrollTrigger tourne **hors du Canvas R3F** — il faut partager `invalidate` via un ref :

```tsx
// Parent (hors Canvas) :
const invalidateRef = useRef<(() => void) | null>(null);

// Enfant (dans Canvas) :
const { invalidate } = useThree();
useEffect(() => { invalidateRef.current = invalidate; }, [invalidate]);

// Dans le callback ScrollTrigger :
progressRef.current = p;
invalidateRef.current?.();
```

Sans ce pattern, le scroll met à jour `progressRef` mais aucun frame n'est rendu.

## Checklist

- [ ] `useGLTF.preload('/models/...')` en bas du fichier
- [ ] Actions configurées `LoopOnce` + `clampWhenFinished`
- [ ] `invalidateRef` partagé entre ScrollTrigger et Canvas
- [ ] Cleanup : `mixer.stopAllAction()` + `mixer.uncacheRoot(scene)` dans le return du useEffect
- [ ] Damping scroll via ref (`smoothProgress += delta * factor`) — jamais setState dans useFrame
