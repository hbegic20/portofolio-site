"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";

const STOPS = [0, 0.45, 0, -0.45];

export function TapRotate({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);
  const step = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += (STOPS[step.current] - g.rotation.y) * (1 - Math.exp(-delta * 4));
  });

  return (
    <group ref={group} onClick={() => (step.current = (step.current + 1) % STOPS.length)}>
      {children}
    </group>
  );
}
