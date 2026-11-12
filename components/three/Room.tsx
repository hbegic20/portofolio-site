"use client";

import { useMemo } from "react";
import type { ThemeColors } from "@/lib/useThemeColors";
import { KitPiece, type Palette } from "./KitPiece";
import { MonitorScreen } from "./MonitorScreen";
import { ServerRack } from "./ServerRack";

type RoomProps = {
  colors: ThemeColors;
  onMonitorClick: () => void;
};

const TILES = [-2, 0, 2];
const MONITOR_SCALE = 0.3;
const DESK_TOP = 0.77;
const MONITOR: [number, number, number] = [0.2, DESK_TOP, -2.78];
const SCREEN = {
  width: 3.79 * MONITOR_SCALE,
  height: 2.31 * MONITOR_SCALE,
  centerY: 1.715 * MONITOR_SCALE,
  front: 0.16 * MONITOR_SCALE + 0.004,
  tilt: Math.atan2(0.32, 2.31),
};

function palettes(c: ThemeColors) {
  const furniture: Palette = {
    wood: { color: "#4a3a33" },
    woodDark: { color: "#33271f" },
    metal: { color: "#8b93a8", rough: 0.5 },
    metalMedium: { color: "#2b3350", rough: 0.6 },
    metalDark: { color: "#0d1222", rough: 0.5 },
    carpet: { color: "#1f2b52" },
    carpetDarker: { color: "#18213f" },
    carpetWhite: { color: "#c9d0e0" },
    plant: { color: "#2f8f5b" },
    lamp: { color: "#ffd9a0", emissive: "#ffb85c", intensity: 0.4 },
    glass: { color: c["surface-sunk"], emissive: c.accent, intensity: 0.35 },
    default: { color: c.border },
  };
  const wall: Palette = {
    ...furniture,
    wood: { color: "#2c3554" },
    metalDark: { color: "#1d2440" },
    _defaultMat: { color: "#1d2440" },
  };
  const floor: Palette = { ...furniture, wood: { color: "#121828" } };
  const monitor: Palette = { ...furniture, metal: { color: c["surface-sunk"] } };
  return { furniture, wall, floor, monitor };
}

export function Room({ colors: c, onMonitorClick }: RoomProps) {
  const p = useMemo(() => palettes(c), [c]);

  return (
    <group position={[0, -1.1, 0]}>
      {TILES.flatMap((x) =>
        TILES.map((z) => (
          <KitPiece key={`f${x}${z}`} part="floorFull" palette={p.floor} position={[x, -0.1, z]} />
        )),
      )}
      {TILES.map((x) => (
        <KitPiece key={`b${x}`} part="wall" palette={p.wall} position={[x, 0, -3.05]} />
      ))}
      {TILES.map((z) => (
        <KitPiece
          key={`l${z}`}
          part={z === 0 ? "wallWindow" : "wall"}
          palette={p.wall}
          position={[-3.05, 0, z]}
          rotation={Math.PI / 2}
        />
      ))}

      <KitPiece part="rugRectangle" palette={p.furniture} position={[0.3, 0, -1.7]} />
      <KitPiece part="desk" palette={p.furniture} position={[0.2, 0, -2.6]} rotation={Math.PI} />
      <KitPiece
        part="computerScreen"
        palette={p.monitor}
        position={MONITOR}
        rotation={Math.PI}
        scale={MONITOR_SCALE}
      />
      <MonitorScreen
        colors={c}
        position={[MONITOR[0], DESK_TOP + SCREEN.centerY, MONITOR[2] + SCREEN.front]}
        width={SCREEN.width}
        height={SCREEN.height}
        tilt={SCREEN.tilt}
        onClick={onMonitorClick}
      />
      <KitPiece part="computerKeyboard" palette={p.furniture} position={[0.2, DESK_TOP, -2.38]} />
      <KitPiece part="computerMouse" palette={p.furniture} position={[0.68, DESK_TOP, -2.38]} />
      <KitPiece part="lampSquareTable" palette={p.furniture} position={[0.78, DESK_TOP, -2.8]} />
      <KitPiece part="books" palette={p.furniture} position={[-0.32, DESK_TOP, -2.82]} />
      <KitPiece part="chairDesk" palette={p.furniture} position={[0.2, 0, -1.85]} />

      <ServerRack colors={c} position={[-2.4, 0, -2.4]} />
      <KitPiece part="speakerSmall" palette={p.furniture} position={[-1.55, 0, -2.78]} />

      <KitPiece part="bookcaseOpen" palette={p.furniture} position={[2.1, 0, -2.75]} />
      <KitPiece part="plantSmall1" palette={p.furniture} position={[2.1, 1.76, -2.75]} />
      <KitPiece part="books" palette={p.furniture} position={[2.1, 0.45, -2.75]} />
      <KitPiece part="pottedPlant" palette={p.furniture} position={[2.45, 0, -1.4]} />
      <KitPiece
        part="cardboardBoxClosed"
        palette={p.furniture}
        position={[-2.35, 0, -1.25]}
        rotation={0.4}
      />
      <pointLight position={[0.78, 1.25, -2.55]} intensity={1.2} distance={2.2} color="#ffb85c" />

      <mesh position={[-1.0, 1.85, -2.99]}>
        <boxGeometry args={[0.7, 0.9, 0.02]} />
        <meshStandardMaterial color={c["surface-sunk"]} roughness={0.8} />
      </mesh>
      <mesh position={[-1.0, 2.05, -2.975]}>
        <boxGeometry args={[0.44, 0.04, 0.01]} />
        <meshStandardMaterial color={c.accent} emissive={c.accent} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-1.06, 1.94, -2.975]}>
        <boxGeometry args={[0.32, 0.04, 0.01]} />
        <meshStandardMaterial color={c["text-subtle"]} />
      </mesh>
    </group>
  );
}
