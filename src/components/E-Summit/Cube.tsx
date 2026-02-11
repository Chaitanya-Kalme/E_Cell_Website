"use client";

import * as THREE from "three";
import { useMemo } from "react";

export default function IITCube() {
  // Memoize material so it's shared across all meshes in the group
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#cfd6dd",
    metalness: 0.95,
    roughness: 0.2,
  }), []);

  const size = 2.4;
  const bar = 0.22;
  const height = 3;

  return (
    <group position={[0, 8.1, 0]}>
      {/* Vertical bars */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
        <mesh key={`v-${i}`} position={[x * size, height / 2, z * size]}>
          <boxGeometry args={[bar, height, bar]} />
          <primitive attach="material" object={material} />
        </mesh>
      ))}

      {/* Top & Bottom horizontal bars */}
      {[0, height].map((yPos) => 
        [0, Math.PI / 2].map((rot, i) => (
          <mesh key={`h-${yPos}-${i}`} rotation={[0, rot, 0]} position={[0, yPos, 0]}>
            <boxGeometry args={[size * 2 + bar, bar, bar]} />
            <primitive attach="material" object={material} />
          </mesh>
        ))
      )}
    </group>
  );
}