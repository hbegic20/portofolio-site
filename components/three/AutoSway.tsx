"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";

const AMPLITUDE = 0.14;
const SPEED = 0.35;

export function AutoSway({ paused, children }: { paused: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const target = paused ? 0 : Math.sin(clock.elapsedTime * SPEED) * AMPLITUDE;
    g.rotation.y += (target - g.rotation.y) * (1 - Math.exp(-delta * 3));
  });

  return <group ref={group}>{children}</group>;
}
