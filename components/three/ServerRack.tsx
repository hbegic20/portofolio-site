"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MeshStandardMaterial, PointLight } from "three";
import { REDUCED_MOTION } from "@/lib/detectLiteMode";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { ThemeColors } from "@/lib/useThemeColors";
import { useUIStore } from "@/store/ui";

const LEDS = 8;
const BURST_MS = 1400;

type ServerRackProps = {
  colors: ThemeColors;
  position: [number, number, number];
};

export function ServerRack({ colors, position }: ServerRackProps) {
  const leds = useRef<(MeshStandardMaterial | null)[]>([]);
  const glow = useRef<PointLight>(null);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  const ledColor = (i: number) => (i % 3 === 0 ? colors.accent : colors.ok);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const last = useUIStore.getState().requests.at(-1);
    const age = last ? performance.now() - last.at : Infinity;
    const burst = last && age < BURST_MS ? last : null;

    if (glow.current) {
      glow.current.color.set(burst && !burst.ok ? colors.err : colors.ok);
      glow.current.intensity = burst ? 4 * (1 - age / BURST_MS) : 0;
    }

    leds.current.forEach((m, i) => {
      if (!m) return;
      m.emissive.set(burst && !burst.ok ? colors.err : ledColor(i));
      if (burst) {
        const flick = reducedMotion || Math.sin(t * 40 + i * 2.1) > -0.4;
        m.emissiveIntensity = flick ? 5 : 0.6;
      } else if (reducedMotion) {
        m.emissiveIntensity = 2;
      } else {
        m.emissiveIntensity = Math.sin(t * (1.3 + i * 0.37) + i * 1.7) > -0.2 ? 3 : 0.35;
      }
    });
  });

  return (
    <group position={position}>
      <pointLight ref={glow} position={[0.3, 1.0, 0.9]} intensity={0} distance={2.4} />
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.8, 1.9, 0.9]} />
        <meshStandardMaterial color={colors["surface-sunk"]} roughness={0.7} />
      </mesh>
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
            color={ledColor(i)}
            emissive={ledColor(i)}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
