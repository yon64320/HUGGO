import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Map progress from [start,end] → [0,1], clamped */
function phaseProgress(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start), 0, 1);
}

// ---------------------------------------------------------------------------
// 3D Scene – reads progressRef every frame
// ---------------------------------------------------------------------------
interface PhoneSceneProps {
  progressRef: React.MutableRefObject<number>;
}

function PhoneScene({ progressRef }: PhoneSceneProps) {
  const { scene } = useGLTF('/models/phone.glb');
  const groupRef = useRef<THREE.Group>(null);
  const { camera, invalidate } = useThree();
  const smoothProgress = useRef(0);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(Math.PI / 2, 0.4, 0);
    }
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const target = progressRef.current;
    const delta = target - smoothProgress.current;

    // Damping for smooth movement
    if (Math.abs(delta) > 0.0001) {
      smoothProgress.current += delta * 0.15;
      invalidate();
    } else {
      smoothProgress.current = target;
    }

    const p = smoothProgress.current;

    // Phase 2: Rotation face (0.15 → 0.35)
    const rotPhase = easeInOutCubic(phaseProgress(p, 0.15, 0.35));
    groupRef.current.rotation.y = lerp(0.4, 0, rotPhase);

    // Phase 3: Camera zoom (0.35 → 0.75)
    const zoomPhase = easeInOutCubic(phaseProgress(p, 0.35, 0.75));
    const camZ1 = lerp(5, 1, zoomPhase);

    // Phase 4: Screen fills viewport (0.75 → 0.90)
    const fillPhase = easeInOutCubic(phaseProgress(p, 0.75, 0.90));
    const camZ2 = lerp(1, 0.2, fillPhase);
    const scale = lerp(1.3, 2.0, fillPhase);

    // Combine camera Z: use camZ1 until phase 3 is done, then camZ2
    const camZ = p < 0.75 ? camZ1 : camZ2;
    camera.position.z = camZ;
    groupRef.current.scale.setScalar(p < 0.75 ? 1.3 : scale);
  });

  return (
    <group ref={groupRef} scale={1.3}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/phone.glb');

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface HeroPhoneZoomProps {
  triggerSelector: string;
  heroTextSelector: string;
}

export default function HeroPhoneZoom({ triggerSelector, heroTextSelector }: HeroPhoneZoomProps) {
  const progressRef = useRef(0);
  const [canvasUnmounted, setCanvasUnmounted] = useState(false);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect if we should animate
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency < 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isMobile && !isLowEnd && !prefersReducedMotion) {
      setShouldAnimate(true);
    }
  }, []);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!shouldAnimate) return;

    let st: any;

    import('../animations/gsap-init').then(({ ScrollTrigger }) => {
      const heroText = document.querySelector(heroTextSelector) as HTMLElement | null;
      const container = containerRef.current;

      st = ScrollTrigger.create({
        trigger: triggerSelector,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self: any) => {
          const p = self.progress as number;
          progressRef.current = p;

          // Phase 1: Hero text fade out (0.00 → 0.15)
          if (heroText) {
            const textOpacity = p < 0.15 ? 1 - p / 0.15 : 0;
            heroText.style.opacity = String(textOpacity);
            // Hide pointer events when invisible
            heroText.style.pointerEvents = textOpacity < 0.01 ? 'none' : '';
          }

          // Phase 5: Canvas fade out (0.90 → 1.00)
          if (container) {
            if (p > 0.90) {
              const fadeOut = 1 - (p - 0.90) / 0.10;
              container.style.opacity = String(Math.max(0, fadeOut));
            } else {
              container.style.opacity = '1';
            }
          }

          // Unmount canvas after fully scrolled, with delay for scroll-back
          if (p >= 1) {
            if (!unmountTimer.current) {
              unmountTimer.current = setTimeout(() => setCanvasUnmounted(true), 500);
            }
          } else {
            // Cancel unmount if scrolling back
            if (unmountTimer.current) {
              clearTimeout(unmountTimer.current);
              unmountTimer.current = null;
            }
            setCanvasUnmounted(false);
          }
        },
      });
    });

    return () => {
      if (st) st.kill();
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
    };
  }, [shouldAnimate, triggerSelector, heroTextSelector]);

  if (!shouldAnimate || canvasUnmounted) return null;

  return (
    <div ref={containerRef} className="hero-zoom-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} />
        <pointLight position={[-3, -3, 3]} intensity={0.4} color="#5E7A5E" />
        <Suspense fallback={null}>
          <PhoneScene progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
