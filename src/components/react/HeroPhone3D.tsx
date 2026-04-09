import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import type { Group } from 'three';

/**
 * Simple smartphone placeholder (box shape) with an embedded WhatsApp-style
 * conversation rendered via drei's <Html /> component.
 * The phone subtly follows the pointer and floats in space.
 */
function PhoneModel() {
  const ref = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (ref.current) {
      ref.current.rotation.y = pointer.x * 0.3;
      ref.current.rotation.x = -pointer.y * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={ref}>
        {/* Phone body */}
        <mesh>
          <boxGeometry args={[2.2, 4.2, 0.2]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 0.1, 0.11]}>
          <planeGeometry args={[1.9, 3.6]} />
          <meshStandardMaterial
            color="#4A9B4A"
            emissive="#4A9B4A"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Screen content overlay with HTML */}
        <Html
          position={[0, 0.1, 0.15]}
          transform
          occlude
          distanceFactor={3}
          style={{
            width: '190px',
            height: '360px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: '#f0f0f0',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '10px',
              fontFamily: 'DM Sans, sans-serif',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                background: '#25D366',
                color: 'white',
                padding: '6px 10px',
                borderRadius: '12px',
                borderTopLeftRadius: '4px',
                alignSelf: 'flex-start',
                maxWidth: '80%',
              }}
            >
              Bonjour ! 👋 Bienvenue chez votre boulangerie.
            </div>
            <div
              style={{
                background: '#e8e8e8',
                padding: '6px 10px',
                borderRadius: '12px',
                borderTopRightRadius: '4px',
                alignSelf: 'flex-end',
                maxWidth: '80%',
              }}
            >
              Je voudrais commander 2 baguettes
            </div>
            <div
              style={{
                background: '#25D366',
                color: 'white',
                padding: '6px 10px',
                borderRadius: '12px',
                borderTopLeftRadius: '4px',
                alignSelf: 'flex-start',
                maxWidth: '80%',
              }}
            >
              Parfait ! 🥖 2 baguettes tradition ajoutées. Retrait ou livraison ?
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

interface Props {
  fallbackImage?: string;
}

export default function HeroPhone3D({ fallbackImage }: Props) {
  // Hardware detection for low-end devices
  const isLowEnd =
    typeof navigator !== 'undefined' && navigator.hardwareConcurrency < 4;

  if (isLowEnd && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt="HUGGO smartphone demo"
        className="w-full max-w-md mx-auto"
      />
    );
  }

  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#4A9B4A" />
        <Suspense fallback={null}>
          <PhoneModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
