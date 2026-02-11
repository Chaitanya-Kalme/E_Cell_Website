"use client";

import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, Sky, SoftShadows } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import IITCube from "./Cube";

function TrapezoidPillar({ position, targetY, onDone }: { 
  position: [number, number, number], 
  targetY: number, 
  onDone: () => void 
}) {
  const mesh = useRef<THREE.Group>(null!);
  const [isDone, setIsDone] = useState(false);
  const [showCube, setShowCube] = useState(false);

  const texture = useLoader(THREE.TextureLoader, "/texture1.jpg");
  
  // Memoize Geometry: Cylinder with 4 sides = Trapezoid Pillar
  const geometry = useMemo(() => {
    // args: [radiusTop, radiusBottom, height, radialSegments]
    const geo = new THREE.CylinderGeometry(2.2, 3.5, 16, 4);
    geo.rotateY(Math.PI / 4); // Align faces to axes
    return geo;
  }, []);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.75,
  }), [texture]);

  useFrame((state, delta) => {
    if (mesh.current.position.y < targetY) {
      mesh.current.position.y += 8 * delta; // Framerate independent movement
    } else if (!isDone) {
      setIsDone(true);
      setShowCube(true);
      onDone();
    }
  });

  return (
    <group ref={mesh} position={[position[0], -12, position[2]]}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      {showCube && <IITCube />}
    </group>
  );
}

function Scene({ onFinish }: { onFinish: () => void }) {
  const completed = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useFrame(() => {
    if (cameraRef.current) cameraRef.current.lookAt(0, 4, 0);
  });

  const pillarDone = () => {
    completed.current += 1;
    if (completed.current === 4) {
      setTimeout(onFinish, 1500);
    }
  };

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 20, 40]} fov={45} />
      
      <Sky sunPosition={[100, 50, 100]} />
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>

      <TrapezoidPillar position={[15, 8, 15]} targetY={8} onDone={pillarDone} />
      <TrapezoidPillar position={[-15, 8, 15]} targetY={8} onDone={pillarDone} />
      <TrapezoidPillar position={[15, 8, -15]} targetY={8} onDone={pillarDone} />
      <TrapezoidPillar position={[-15, 8, -15]} targetY={8} onDone={pillarDone} />
    </>
  );
}

export default function IntroAnimation({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Canvas shadows camera={{ position: [0, 20, 40] }}>
        <Scene onFinish={onFinish} />
      </Canvas>
    </div>
  );
}