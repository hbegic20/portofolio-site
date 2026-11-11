"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MeshStandardMaterial } from "three";
import type { ThemeColors } from "@/lib/useThemeColors";

const LEDS = 8;

type ServerRackProps = {
  colors: ThemeColors;
  position: [number, number, number];
};

/** Rack with a vertical LED strip; LEDs blink by mutating emissiveIntensity (no React state). */
export function ServerRack({ colors, position }: ServerRackProps) {
  const leds = useRef<(MeshStandardMaterial | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    leds.current.forEach((m, i) => {
      if (!m) return;
      const on = Math.sin(t * (1.3 + i * 0.37) + i * 1.7) > -0.2;
      m.emissiveIntensity = on ? 3 : 0.35;
    });
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.8, 1.9, 0.9]} />
        <meshStandardMaterial color={colors["surface-sunk"]} roughness={0.7} />
      </mesh>
      {/* server units */}
      {[0.35, 0.75, 1.15, 1.55].map((y) => (
        <mesh key={y} position={[0, y, 0.452]}>
          <boxGeometry args={[0.66, 0.3, 0.01]} />
          <meshStandardMaterial color={colors["border"]} roughness={0.6} />
        </mesh>
      ))}
      {Array.from({ length: LEDS }, (_, i) => (
        <mesh key={i} position={[0.24, 0.25 + i * 0.2, 0.46]}>
          <boxGeometry args={[0.06, 0.025, 0.01]} />
          <meshStandardMaterial
            ref={(m) => {
              leds.current[i] = m;
            }}
            color={i % 3 === 0 ? colors.accent : colors.ok}
            emissive={i % 3 === 0 ? colors.accent : colors.ok}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
