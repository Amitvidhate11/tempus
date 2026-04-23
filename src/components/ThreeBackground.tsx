"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Rings({ count = 35 }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 1 - 5;
    }
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, -5]}>
      {Array.from({ length: count }).map((_, i) => {
        // Logarithmic spacing for rings to look natural
        const radius = Math.pow(i, 1.2) * 0.5 + 2;
        const opacity = Math.max(0.05, 0.4 - (i / count) * 0.4);
        
        return (
          <mesh key={i} rotation={[0, 0, 0]}>
            <ringGeometry args={[radius, radius + 0.02, 128]} />
            <meshBasicMaterial 
              color="#2b91db" 
              transparent 
              opacity={opacity} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#071330] via-[#020817] to-[#01040a]">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <Rings />
      </Canvas>
    </div>
  );
}
