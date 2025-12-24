"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Model() {
  const ref = useRef<any>(null);
  const gltf = useGLTF("/models/shiba.glb");

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.3;
  });

  return (
    <primitive ref={ref} object={gltf.scene} scale={2.5} position={[0, 0, 0]} />
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Model />
      </Canvas>
    </div>
  );
}
