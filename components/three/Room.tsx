"use client";

import { useMemo, type RefObject } from "react";
import { Color } from "three";
import type { ThemeColors } from "@/lib/useThemeColors";
import { MonitorScreen } from "./MonitorScreen";
import { ServerRack } from "./ServerRack";

type V3 = [number, number, number];

function Block({
  size,
  position,
  color,
  rough = 0.85,
}: {
  size: V3;
  position: V3;
  color: string;
  rough?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={rough} />
    </mesh>
  );
}

type RoomProps = {
  colors: ThemeColors;
  onMonitorClick: () => void;
  portal: RefObject<HTMLElement | null>;
};

export function Room({ colors, onMonitorClick, portal }: RoomProps) {
  const c = colors;
  const leaf = useMemo(() => new Color(c.ok).multiplyScalar(0.42), [c.ok]);
  return (
    <group position={[0, -1.1, 0]}>
      <Block size={[6, 0.1, 6]} position={[0, -0.05, 0]} color={c.surface} />
      <Block size={[6, 3.2, 0.1]} position={[0, 1.6, -3.05]} color={c.border} />
      <Block size={[0.1, 3.2, 6]} position={[-3.05, 1.6, 0]} color={c["border-strong"]} />

      <Block size={[2.6, 0.01, 1.8]} position={[0.2, 0.005, -1.2]} color={c["bg-alt"]} />

      <Block
        size={[2.6, 0.06, 1.1]}
        position={[0.2, 0.76, -2.4]}
        color={c["border-strong"]}
        rough={0.6}
      />
      {[-1.15, 1.15].flatMap((x) =>
        [-2.85, -1.95].map((z) => (
          <Block
            key={`${x}${z}`}
            size={[0.06, 0.76, 0.06]}
            position={[0.2 + x, 0.38, z]}
            color={c.bg}
          />
        )),
      )}

      <Block size={[0.4, 0.02, 0.25]} position={[0.2, 0.8, -2.65]} color={c.bg} />
      <Block size={[0.07, 0.36, 0.07]} position={[0.2, 0.98, -2.7]} color={c.bg} />
      <Block size={[1.36, 0.8, 0.05]} position={[0.2, 1.52, -2.75]} color={c.bg} rough={0.4} />
      <MonitorScreen
        colors={c}
        position={[0.2, 1.52, -2.722]}
        onClick={onMonitorClick}
        portal={portal}
      />

      <Block size={[0.9, 0.03, 0.28]} position={[0.2, 0.805, -2.1]} color={c.bg} rough={0.5} />
      <mesh position={[1.05, 0.85, -2.15]}>
        <cylinderGeometry args={[0.06, 0.055, 0.12, 20]} />
        <meshStandardMaterial color={c["text-subtle"]} roughness={0.5} />
      </mesh>

      <Block size={[0.55, 0.06, 0.55]} position={[0.2, 0.5, -1.5]} color={c.bg} />
      <Block size={[0.55, 0.62, 0.06]} position={[0.2, 0.84, -1.24]} color={c.bg} />
      <Block size={[0.06, 0.47, 0.06]} position={[0.2, 0.235, -1.5]} color={c["surface-sunk"]} />

      <ServerRack colors={c} position={[-2.4, 0, -2.4]} />

      <Block size={[0.06, 1.25, 1.55]} position={[-2.98, 1.85, -0.4]} color={c.bg} />
      <mesh position={[-2.94, 1.85, -0.4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.4, 1.1]} />
        <meshStandardMaterial
          color={c["surface-sunk"]}
          emissive={c.accent}
          emissiveIntensity={0.22}
          toneMapped={false}
        />
      </mesh>

      <Block size={[1.1, 0.04, 0.26]} position={[1.9, 2.05, -2.87]} color={c["border-strong"]} />
      {[0, 1, 2, 3].map((i) => (
        <Block
          key={i}
          size={[0.08, 0.28 - (i % 2) * 0.05, 0.2]}
          position={[1.5 + i * 0.12, 2.2 - (i % 2) * 0.025, -2.87]}
          color={[c["code-kw"], c.accent, c["code-str"], c.ok][i]}
          rough={0.7}
        />
      ))}
      <Block size={[0.8, 1.05, 0.02]} position={[-1.1, 2.05, -2.99]} color={c["surface-sunk"]} />
      <Block size={[0.5, 0.04, 0.01]} position={[-1.1, 2.3, -2.975]} color={c.accent} />
      <Block size={[0.36, 0.04, 0.01]} position={[-1.17, 2.18, -2.975]} color={c["text-subtle"]} />

      <mesh position={[2.45, 0.25, -2.45]}>
        <cylinderGeometry args={[0.22, 0.17, 0.5, 20]} />
        <meshStandardMaterial color={c["border-strong"]} roughness={0.9} />
      </mesh>
      <mesh position={[2.45, 0.85, -2.45]}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color={leaf} roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}
