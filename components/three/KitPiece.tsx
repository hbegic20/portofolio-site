"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Color, Mesh, MeshStandardMaterial, Vector3, type Material } from "three";

export const KIT_URL = "/models/kit.glb";
export const KIT_SCALE = 0.2;

export type KitPart =
  | "bookcaseOpen"
  | "books"
  | "chairDesk"
  | "computerKeyboard"
  | "computerMouse"
  | "computerScreen"
  | "desk"
  | "floorFull"
  | "lampSquareTable"
  | "laptop"
  | "plantSmall1"
  | "pottedPlant"
  | "rugRectangle"
  | "speakerSmall"
  | "wall"
  | "wallWindow"
  | "cardboardBoxClosed";

export type Finish = { color: string; emissive?: string; intensity?: number; rough?: number };
export type Palette = Record<string, Finish>;

type V3 = [number, number, number];

type KitPieceProps = {
  part: KitPart;
  palette: Palette;
  position?: V3;
  rotation?: number;
  scale?: number;
};

const cache = new Map<string, MeshStandardMaterial>();

function materialFor(finish: Finish): MeshStandardMaterial {
  const key = JSON.stringify(finish);
  let m = cache.get(key);
  if (!m) {
    m = new MeshStandardMaterial({
      color: new Color(finish.color),
      roughness: finish.rough ?? 0.85,
      metalness: 0,
      flatShading: true,
    });
    if (finish.emissive) {
      m.emissive = new Color(finish.emissive);
      m.emissiveIntensity = finish.intensity ?? 1;
      m.toneMapped = false;
    }
    cache.set(key, m);
  }
  return m;
}

export function KitPiece({
  part,
  palette,
  position,
  rotation = 0,
  scale = KIT_SCALE,
}: KitPieceProps) {
  const { scene } = useGLTF(KIT_URL);

  const object = useMemo(() => {
    const src = scene.getObjectByName(part);
    if (!src) throw new Error(`kit.glb has no "${part}"`);
    const clone = src.clone(true);
    clone.position.set(0, 0, 0);
    clone.traverse((o) => {
      if (!(o instanceof Mesh)) return;
      const name = (o.material as Material).name;
      const finish = palette[name] ?? palette.default;
      if (finish) o.material = materialFor(finish);
    });
    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    clone.position.set(-center.x, -box.min.y, -center.z);
    return clone;
  }, [scene, part, palette]);

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <primitive object={object} />
    </group>
  );
}

useGLTF.preload(KIT_URL);
