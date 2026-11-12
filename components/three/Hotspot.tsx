"use client";

import { Html } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useRef, useState, type ReactNode, type RefObject } from "react";
import type { Group } from "three";
import { getSection, type SectionId } from "@/content/sections";
import { scrollToId } from "@/lib/scroll";

const DRAG_PX = 6;
const LIFT = 0.06;

type HotspotProps = {
  section: SectionId;
  labelAt: [number, number, number];
  portal: RefObject<HTMLElement | null>;
  onSelect?: () => void;
  lift?: boolean;
  children: ReactNode;
};

export function Hotspot({
  section,
  labelAt,
  portal,
  onSelect,
  lift = true,
  children,
}: HotspotProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const target = hovered && lift ? LIFT : 0;
    g.position.y += (target - g.position.y) * (1 - Math.exp(-delta * 10));
  });

  const select = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta > DRAG_PX) return;
    if (onSelect) onSelect();
    else scrollToId(section);
  };

  return (
    <>
      <group
        ref={group}
        onClick={select}
        onPointerEnter={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        {children}
      </group>
      {hovered && (
        <Html
          center
          position={labelAt}
          portal={portal as RefObject<HTMLElement>}
          zIndexRange={[20, 10]}
          style={{ pointerEvents: "none" }}
        >
          <span className="block rounded-[10px] border border-accent/40 bg-surface/95 px-2.5 py-1.5 font-mono text-xs whitespace-nowrap text-accent shadow-lg shadow-black/40">
            <span className="text-ok">$</span> cd ./{getSection(section).slug}
          </span>
        </Html>
      )}
    </>
  );
}
