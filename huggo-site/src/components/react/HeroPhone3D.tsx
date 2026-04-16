import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Utilities (pattern from HeroPhoneZoom)
// ---------------------------------------------------------------------------
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
function easeInOutCubic(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function phaseProgress(p: number, start: number, end: number) { return clamp((p - start) / (end - start), 0, 1); }

// ---------------------------------------------------------------------------
// 3D Model – AnimationMixer scrubbing from GLB
// ---------------------------------------------------------------------------
interface PhoneModelProps {
  screenImage: string;
  progressRef: React.MutableRefObject<number>;
  invalidateRef: React.MutableRefObject<(() => void) | null>;
}

function PhoneModel({ screenImage, progressRef, invalidateRef }: PhoneModelProps) {
  const { scene, animations } = useGLTF('/models/phone_assembly_anim.glb');
  const screenTexture = useTexture(screenImage);
  const { invalidate } = useThree();
  const smoothProgress = useRef(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clipDurationRef = useRef(0);

  // Expose invalidate to parent so ScrollTrigger can trigger frames
  useEffect(() => { invalidateRef.current = invalidate; }, [invalidate, invalidateRef]);

  useEffect(() => {
    // Screen texture setup
    screenTexture.flipY = false;
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    screenTexture.generateMipmaps = false;
    screenTexture.repeat.set(1, 1);
    screenTexture.offset.set(0, 0);
    screenTexture.wrapS = THREE.ClampToEdgeWrapping;
    screenTexture.wrapT = THREE.ClampToEdgeWrapping;
    screenTexture.rotation = 0;
    screenTexture.center.set(0.5, 0.5);
    screenTexture.needsUpdate = true;

    // Apply texture to Screen mesh
    scene.traverse((child) => {
      if (child.name === 'Screen' || child.name === 'ScreenDisplay') {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.material = new THREE.MeshBasicMaterial({
            map: screenTexture,
            side: THREE.DoubleSide,
            transparent: false,
            depthWrite: true,
          });
          (mesh.material as THREE.Material).needsUpdate = true;
        }
      }
    });

    // Hide the ZoomCamera mesh (not needed for rendering)
    scene.traverse((child) => {
      if (child.name === 'ZoomCamera') {
        child.visible = false;
      }
    });

    // Setup AnimationMixer — play all clips for scrubbing
    const mixer = new THREE.AnimationMixer(scene);
    for (const clip of animations) {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    }
    clipDurationRef.current = animations.length > 0
      ? Math.max(...animations.map(c => c.duration))
      : 1;
    mixer.setTime(0);
    mixerRef.current = mixer;

    invalidate();

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
    };
  }, [scene, animations, screenTexture, invalidate]);

  useFrame(() => {
    const target = progressRef.current;
    const delta = target - smoothProgress.current;

    if (Math.abs(delta) > 0.0001) {
      smoothProgress.current += delta * 0.10;
      invalidate();
    } else {
      smoothProgress.current = target;
    }

    const p = smoothProgress.current;
    const mixer = mixerRef.current;
    if (!mixer) return;

    // Map 0–85% scroll to 0–100% animation
    const animProgress = clamp(p / 0.85, 0, 1);
    mixer.setTime(animProgress * clipDurationRef.current);
  });

  return <primitive object={scene} />;
}

useGLTF.preload('/models/phone_assembly_anim.glb');

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface Props {
  screenImage?: string;
  triggerSelector?: string;
  heroTextSelector?: string;
}

export default function HeroPhone3D({
  screenImage = '/images/stats-section-screen.png',
  triggerSelector,
  heroTextSelector,
}: Props) {
  const progressRef = useRef(0);
  const invalidateRef = useRef<(() => void) | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [canvasUnmounted, setCanvasUnmounted] = useState(false);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect animation capability
  useEffect(() => {
    const isSmallScreen = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isSmallScreen && !prefersReducedMotion) {
      setShouldAnimate(true);
    }
  }, []);

  // GSAP ScrollTrigger — drives progressRef + DOM animations
  useEffect(() => {
    if (!shouldAnimate || !triggerSelector) return;

    let st: any;
    import('../animations/gsap-init').then(({ ScrollTrigger }) => {
      const heroText = heroTextSelector
        ? (document.querySelector(heroTextSelector) as HTMLElement | null)
        : null;
      const heroCircle = document.getElementById('hero-circle');
      const container = containerRef.current;

      st = ScrollTrigger.create({
        trigger: triggerSelector,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self: any) => {
          const p = self.progress as number;
          progressRef.current = p;
          invalidateRef.current?.();

          // Phase 2: Hero text fade out + slide down (0.05 → 0.20)
          if (heroText) {
            const textFade = easeInOutCubic(phaseProgress(p, 0.05, 0.20));
            heroText.style.opacity = String(1 - textFade);
            heroText.style.transform = `translateY(${textFade * 30}px)`;
            heroText.style.pointerEvents = textFade > 0.99 ? 'none' : '';
          }

          // Phase 2: Decorative circle fade out (0.05 → 0.15)
          if (heroCircle) {
            const circleFade = phaseProgress(p, 0.05, 0.15);
            heroCircle.style.opacity = String(0.3 * (1 - circleFade));
          }

          // Phase 5: Canvas fade out (0.85 → 1.00)
          if (container) {
            if (p > 0.85) {
              container.style.opacity = String(Math.max(0, 1 - (p - 0.85) / 0.15));
            } else {
              container.style.opacity = '1';
            }
          }

          // Unmount canvas after fully scrolled (with delay for scroll-back)
          if (p >= 1) {
            if (!unmountTimer.current) {
              unmountTimer.current = setTimeout(() => setCanvasUnmounted(true), 500);
            }
          } else {
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

  if (!shouldAnimate) return null;

  if (canvasUnmounted) return null;

  return (
    <div ref={containerRef} className="hero-phone-canvas">
      <Canvas
        camera={{ position: [3, 4, 5], fov: 30, near: 0.1, far: 100 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
      >
        <Environment preset="city" background={false} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 4, 3]} intensity={1.0} />
        <directionalLight position={[-2, 1, 2]} intensity={0.3} color="#8FAF82" />
        <Suspense fallback={null}>
          <PhoneModel
            screenImage={screenImage}
            progressRef={progressRef}
            invalidateRef={invalidateRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
