"use client";

import { Float, Html } from "@react-three/drei";
import type { RefObject } from "react";
import { heroBadges } from "@/content/skills";

const spots: [number, number, number][] = [
  [-1.6, 1.55, -1.2],
  [1.9, 1.25, -1.0],
  [-0.9, 0.05, 0.6],
  [1.4, -0.35, 0.9],
];

/** Mono chips floating around the room; DOM so they use Geist Mono and stay crisp. */
export function FloatingBadges({ portal }: { portal: RefObject<HTMLElement | null> }) {
  return (
    <>
      {heroBadges.slice(0, spots.length).map((label, i) => (
        <Float
          key={label}
          position={spots[i]}
          speed={1.4 + i * 0.2}
          rotationIntensity={0}
          floatIntensity={0.9}
        >
          <Html
            center
            portal={portal as RefObject<HTMLElement>}
            zIndexRange={[5, 0]}
            style={{ pointerEvents: "none" }}
          >
            <span className="block rounded-[10px] border border-border-strong bg-surface/90 px-2.5 py-1.5 font-mono text-xs font-medium whitespace-nowrap text-accent shadow-lg shadow-black/40 backdrop-blur-sm">
              {label}
            </span>
          </Html>
        </Float>
      ))}
    </>
  );
}
