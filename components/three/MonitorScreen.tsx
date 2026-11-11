"use client";

import { Html } from "@react-three/drei";
import type { RefObject } from "react";
import { Terminal, type TerminalLine } from "@/components/ui/Terminal";
import type { ThemeColors } from "@/lib/useThemeColors";

const lines: TerminalLine[] = [
  { kind: "cmd", text: "pnpm dev" },
  { kind: "out", text: "▲ ready on http://localhost:3000", tone: "ok" },
  { kind: "out", text: "GET /api/v1/me 200 in 9ms", tone: "muted" },
  { kind: "out", text: "GET /api/projects 200 in 14ms", tone: "muted" },
  { kind: "out", text: "POST /api/v1/contact 201 in 41ms", tone: "muted" },
];

// Screen is 1.28 × 0.72 world units; the DOM is laid out at 512 × 288 px.
const PX_W = 512;
const PX_H = 288;
const SCREEN_W = 1.28;

type MonitorScreenProps = {
  colors: ThemeColors;
  position: [number, number, number];
  onClick: () => void;
  portal: RefObject<HTMLElement | null>;
};

export function MonitorScreen({ colors, position, onClick, portal }: MonitorScreenProps) {
  return (
    <group position={position}>
      {/* Glow panel behind the DOM so bloom picks up the screen. */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <planeGeometry args={[SCREEN_W, 0.72]} />
        <meshStandardMaterial
          color={colors["surface-sunk"]}
          emissive={colors.accent}
          emissiveIntensity={0.18}
          toneMapped={false}
        />
      </mesh>
      {/* In transform mode 1 CSS px = distanceFactor / 400 units: 512px × (1 / 400) = 1.28 = screen width. */}
      <Html
        transform
        occlude
        portal={portal as RefObject<HTMLElement>}
        distanceFactor={(SCREEN_W / PX_W) * 400}
        position={[0, 0, 0.004]}
        zIndexRange={[10, 0]}
      >
        <div
          onClick={onClick}
          style={{ width: PX_W, height: PX_H }}
          className="cursor-pointer select-none"
        >
          <Terminal
            title="~/dev-room — zsh"
            lines={lines}
            className="h-full rounded-none border-0 shadow-none"
          />
        </div>
      </Html>
    </group>
  );
}
