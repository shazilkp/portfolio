'use client';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { createNoise3D } from 'simplex-noise';
import TreeField from './TreeField';
import ParticleField from './ParticleField';

export default function Planet() {
  const meshRef = useRef();
  const groupRef = useRef();
  const noise3D = createNoise3D();
  const clusterNoise = createNoise3D();
  const [treePoints, setTreePoints] = useState([]);
  const rough = 1.2;
  const radius = 2;
  const treeRadiusScale = 0.99;


   useEffect(() => {
    if (!meshRef.current) return;

    const geom = meshRef.current.geometry;
    const pos = geom.attributes.position;
    const points = [];
    const positionSet = new Set();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      const len = Math.sqrt(x * x + y * y + z * z);
      const nx = x / len;
      const ny = y / len;
      const nz = z / len;

      const noise = noise3D(nx * rough, ny * rough, nz * rough);
      const scale = radius + noise * 0.3;

      const newX = nx * scale;
      const newY = ny * scale;
      const newZ = nz * scale;

      pos.setXYZ(i, newX, newY, newZ);

      // Only add trees where elevation is high enough
      const clusterValue = noise3D(nx*0.1 , ny*0.1, nz*0.1); // Lower frequency
      if (noise > 0.2 && Math.random() < 0.05  && clusterValue < 1) {
        const treeX = newX * treeRadiusScale;
        const treeY = newY * treeRadiusScale;
        const treeZ = newZ * treeRadiusScale;
        const key = `${treeX.toFixed(3)},${treeY.toFixed(3)},${treeZ.toFixed(3)}`;
        if(!positionSet.has(key)){

          const normal = new THREE.Vector3(treeX, treeY, treeZ).normalize();
          const up = new THREE.Vector3(0, 1, 0);
          const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);
          const type = Math.random() >= 0.5 ? 1 : 0;
          points.push({ position: [treeX, treeY, treeZ], quaternion ,type});
        }
      }
    }

    pos.needsUpdate = true;
    geom.computeVertexNormals();
    setTreePoints(points); // save tree points
  }, []);
;

  useFrame(() => {
    if (groupRef.current) {
      //groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh>
      <mesh ref={groupRef}>
        <mesh >
          <icosahedronGeometry args={[radius, 3]} />
          <meshStandardMaterial color="#04789B" flatShading />
        </mesh>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[radius, 5]}  />
          <meshStandardMaterial color="#79cd56" />
        </mesh>
        <TreeField treePoints={treePoints} />
        
      <ParticleField count={300}  innerRadius={2.1}outerRadius={2.8} textureURL="/leaf.png" />
      </mesh>
    </mesh>

  );
}


//summer tree green #8ade66
//summer tree brown #7d5e4f

//ice #89ddFF