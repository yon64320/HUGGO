import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function PhoneModel() {
  const { scene } = useGLTF('/models/phone.glb');
  const groupRef = useRef<THREE.Group>(null);
  // targetRotY stocké dans une ref pour éviter les re-renders
  const targetRotY = useRef(0.4);
  const { invalidate } = useThree();

  // Initialiser la rotation de départ
  // X: -PI/2 redresse le phone (il est exporté à plat depuis Blender)
  // Y: 0.4 = angle 3/4 élégant initial
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(Math.PI / 2, 0.4, 0);
      targetRotY.current = 0.4;
    }
  }, []);

  // Réagir au scroll
  useEffect(() => {
    const handleScroll = () => {
      targetRotY.current = 0.4 + window.scrollY * 0.0025;
      invalidate(); // Déclenche un rendu
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [invalidate]);

  // Damping fluide vers la rotation cible
  useFrame(() => {
    if (!groupRef.current) return;
    const delta = targetRotY.current - groupRef.current.rotation.y;
    if (Math.abs(delta) > 0.0005) {
      groupRef.current.rotation.y += delta * 0.08;
      invalidate(); // Continue tant que l'animation n'est pas finie
    }
  });

  return (
    <group ref={groupRef} scale={1.3}>
      <primitive object={scene} />
    </group>
  );
}

// Précharge le modèle dès que le module est importé
useGLTF.preload('/models/phone.glb');

interface Props {
  fallbackImage?: string;
}

export default function HeroPhone3D({ fallbackImage }: Props) {
  // Fallback pour les appareils bas de gamme
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
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} />
        <pointLight position={[-3, -3, 3]} intensity={0.4} color="#5E7A5E" />
        <Suspense fallback={null}>
          <PhoneModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
