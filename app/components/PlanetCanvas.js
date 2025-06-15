'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planet from './Planet';

export default function PlanetCanvas() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} castShadow />
        <Planet />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
