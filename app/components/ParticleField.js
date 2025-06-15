'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({
  count = 500,
  innerRadius = 2,
  outerRadius = 3,
  textureURL = '/petal=.png',
  rotationSpeed = 0,
  fallSpeed = 0.00001,
}) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.lerp(innerRadius, outerRadius, Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      arr.push({ pos: new THREE.Vector3(x, y, z), theta, phi, radius: r });
    }
    return arr;
  }, [count, innerRadius, outerRadius]);

  const positions = useMemo(() => {
    const array = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      array[i * 3] = p.pos.x;
      array[i * 3 + 1] = p.pos.y;
      array[i * 3 + 2] = p.pos.z;
    });
    return array;
  }, [particles]);

  useFrame(({clock}) => {
    const time = clock.getElapsedTime()
    const arr = positions;
    particles.forEach((p, i) => {
      p.radius -= fallSpeed;
      if (p.radius < innerRadius) p.radius = outerRadius;

      //p.theta += rotationSpeed;

      const x = p.radius * Math.sin(p.phi) * Math.cos(p.theta) +  Math.sin(time + time * 0.5 + i) * 0.08;
      const y = p.radius * Math.sin(p.phi) * Math.sin(p.theta) -  Math.sin(time + i) * 0.08;
      const z = p.radius * Math.cos(p.phi) ;

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    });
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const texture = useMemo(() => new THREE.TextureLoader().load(textureURL), [textureURL]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        map={texture}
        transparent
        depthWrite={false}
        color="white"
      />
    </points>
  );
}
