"use client"
import React from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";

export default function Pillar({ position, texture }) {
  if (!texture) return null; // ⛑️ prevents undefined crash

  const pillarHeight = 3;

  const pillarTexture = useLoader(TextureLoader, texture);
  const logoTexture = useLoader(TextureLoader, "/logo.png");

  pillarTexture.wrapS = pillarTexture.wrapT = RepeatWrapping;

  useFrame((_, delta) => {
    pillarTexture.offset.y += delta * 0.25;
  });

  return (
    <group position={[position[0], pillarHeight / 2, position[2]]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.6, pillarHeight, 0.6]} />
        <meshStandardMaterial map={pillarTexture} />
      </mesh>

      <sprite position={[0, pillarHeight / 2 + 0.6, 0]} scale={[0.8, 0.8, 1]}>
        <spriteMaterial map={logoTexture} />
      </sprite>
    </group>
  );
}
