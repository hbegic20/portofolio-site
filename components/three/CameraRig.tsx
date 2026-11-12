"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useImperativeHandle, useRef, type Ref, type RefObject } from "react";
import { Vector3 } from "three";
import { gsap } from "@/lib/gsap";
import { scrollToId } from "@/lib/scroll";

export type Framing = { position: Vector3; lookAt: Vector3; fov: number };

export const FRAMING = {
  desktop: { position: new Vector3(6.4, 3.7, 7.0), lookAt: new Vector3(-0.25, 0.2, -1.1), fov: 30 },
  mobile: { position: new Vector3(4.2, 2.5, 6.0), lookAt: new Vector3(-0.3, 0.0, -1.4), fov: 35 },
} satisfies Record<string, Framing>;
const SCREEN = new Vector3(0.2, 0.42, -2.72);
const PARALLAX = 0.3;
const DOLLY = 1.6;

export type CameraRigHandle = { dive: () => void };

type CameraRigProps = {
  ref?: Ref<CameraRigHandle>;
  scrollProgress: RefObject<number>;
  reducedMotion: boolean;
  framing: Framing;
};

export function CameraRig({ ref, scrollProgress, reducedMotion, framing }: CameraRigProps) {
  const { camera } = useThree();
  const diving = useRef(false);
  const target = useRef(new Vector3());
  const look = useRef(framing.lookAt.clone());
  const { position: base, lookAt, fov } = framing;

  useImperativeHandle(ref, () => ({
    dive() {
      if (diving.current) return;
      if (reducedMotion) return scrollToId("about");
      diving.current = true;
      const tl = gsap.timeline({
        defaults: { duration: 1.1, ease: "power3.inOut" },
        onComplete: () => {
          scrollToId("about");
          setTimeout(() => (diving.current = false), 900);
        },
      });
      tl.to(camera.position, { x: SCREEN.x, y: SCREEN.y, z: SCREEN.z + 0.75 }, 0);
      tl.to(look.current, { x: SCREEN.x, y: SCREEN.y, z: SCREEN.z }, 0);
    },
  }));

  useFrame(({ pointer, camera: cam }, delta) => {
    if ("isPerspectiveCamera" in cam && Math.abs(cam.fov - fov) > 0.01) {
      cam.fov += (fov - cam.fov) * (1 - Math.exp(-delta * 3));
      cam.updateProjectionMatrix();
    }
    if (!diving.current) {
      const p = reducedMotion ? 0 : PARALLAX;
      const dolly = (scrollProgress.current ?? 0) * DOLLY;
      target.current.set(
        base.x + pointer.x * p + dolly * 0.6,
        base.y + pointer.y * p + dolly * 0.35,
        base.z + dolly,
      );
      const k = 1 - Math.exp(-delta * 3);
      camera.position.lerp(target.current, k);
      look.current.lerp(lookAt, k);
    }
    camera.lookAt(look.current);
  });

  return null;
}
