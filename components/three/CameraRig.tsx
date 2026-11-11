"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useImperativeHandle, useRef, type Ref, type RefObject } from "react";
import { Vector3 } from "three";
import { gsap } from "@/lib/gsap";
import { scrollToId } from "@/lib/scroll";

export const CAMERA_BASE = new Vector3(6.4, 3.7, 7.0);
const LOOK_AT = new Vector3(-0.25, 0.2, -1.1);
// Just in front of the monitor screen (Room is offset by y −1.1).
const SCREEN = new Vector3(0.2, 0.42, -2.72);
const PARALLAX = 0.3;
const DOLLY = 1.6;

export type CameraRigHandle = { dive: () => void };

type CameraRigProps = {
  ref?: Ref<CameraRigHandle>;
  /** 0 → 1 as the hero scrolls out (written by ScrollTrigger in HeroCanvas). */
  scrollProgress: RefObject<number>;
  reducedMotion: boolean;
};

/** Pointer parallax + scroll dolly; dive() flies into the monitor, then scrolls to #about. */
export function CameraRig({ ref, scrollProgress, reducedMotion }: CameraRigProps) {
  const { camera } = useThree();
  const diving = useRef(false);
  const target = useRef(new Vector3());
  const look = useRef(LOOK_AT.clone());

  useImperativeHandle(ref, () => ({
    dive() {
      if (diving.current) return;
      if (reducedMotion) return scrollToId("about");
      diving.current = true;
      const tl = gsap.timeline({
        defaults: { duration: 1.1, ease: "power3.inOut" },
        onComplete: () => {
          scrollToId("about");
          // Let the lerp ease the camera home once the hero is off-screen.
          setTimeout(() => (diving.current = false), 900);
        },
      });
      tl.to(camera.position, { x: SCREEN.x, y: SCREEN.y, z: SCREEN.z + 0.75 }, 0);
      tl.to(look.current, { x: SCREEN.x, y: SCREEN.y, z: SCREEN.z }, 0);
    },
  }));

  useFrame(({ pointer }, delta) => {
    if (!diving.current) {
      const p = reducedMotion ? 0 : PARALLAX;
      const dolly = (scrollProgress.current ?? 0) * DOLLY;
      target.current.set(
        CAMERA_BASE.x + pointer.x * p + dolly * 0.6,
        CAMERA_BASE.y + pointer.y * p + dolly * 0.35,
        CAMERA_BASE.z + dolly,
      );
      const k = 1 - Math.exp(-delta * 3);
      camera.position.lerp(target.current, k);
      look.current.lerp(LOOK_AT, k);
    }
    camera.lookAt(look.current);
  });

  return null;
}
