'use client';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function Tree({ position = [0, 0, 0], scale = 1 , quaternion ,type }) {
    const { scene: scene1 } = useGLTF('/Tree.glb');
    const { scene: scene2 } = useGLTF('/Tree1.glb');

     const selectedScene = type === 1 ? scene2 : scene1



  return (
    <primitive
      object={selectedScene.clone(true)}
      position={position}
      scale={scale}
      quaternion = {quaternion}
    
    />
  );
}
