'use client';
import Tree from './Tree';
import { useMemo } from 'react';
import * as THREE from 'three';

export default function TreeField({treePoints,  }) {
     const scaleByType = {
  0: 0.0013,   // scale for Tree type 0
  1: 0.075,  // scale for Tree type 1
};
  return treePoints.map((tree, index) => (
    <Tree
      key={index}
      position={tree.position}
      quaternion={tree.quaternion}
      scale={scaleByType[tree.type]}
      type={tree.type}
    />
  ));
}
