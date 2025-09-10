import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const gltf = useMemo(() => useGLTF(url), [url]);
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach(action => {
      action.timeScale = 0.5;
      action.play();
    });
  }, [actions]);

  // Make sure meshes cast and receive shadows
  gltf.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) child.material.envMapIntensity = 1.2; // stronger reflections
    }
  });

  return <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} rotation={[0, 0.5, 0]} />;
}

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 5] }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 2, 5]} intensity={0.5} />
      <directionalLight position={[0, 5, -5]} intensity={0.4} />

      {/* Environment for reflections */}
      <Suspense fallback={null}>
        <Model url="/flaming_orb.glb" />
      </Suspense>

      <OrbitControls enablePan={false} enableZoom={false} minDistance={2} maxDistance={10} />
    </Canvas>
  );
}
