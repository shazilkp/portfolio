'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { createNoise3D } from 'simplex-noise';

export default function Planet() {
  const meshRef = useRef();
  const noise3D = createNoise3D();
  const rough = 2.2;

  useEffect(() => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry;
    const pos = geom.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      const len = Math.sqrt(x * x + y * y + z * z);
      const nx = x / len;
      const ny = y / len;
      const nz = z / len;

      const noise = noise3D(nx * rough, ny * rough, nz *rough);
      const scale = 2 + noise * 0.1;

      pos.setXYZ(i, nx * scale, ny * scale, nz * scale);
    }

    pos.needsUpdate = true;
    geom.computeVertexNormals();
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 64]} />
      <meshStandardMaterial color="#88c0d0" flatShading />
    </mesh>
  );
}
