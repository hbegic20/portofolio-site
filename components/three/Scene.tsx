"use client";

import { PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { REDUCED_MOTION } from "@/lib/detectLiteMode";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useThemeColors } from "@/lib/useThemeColors";
import { CAMERA_BASE, CameraRig, type CameraRigHandle } from "./CameraRig";
import { Effects } from "./Effects";
import { FloatingBadges } from "./FloatingBadges";
import { Room } from "./Room";
import { ProgressReporter } from "./ProgressReporter";
import { TapRotate } from "./TapRotate";

type SceneProps = {
  active: boolean;
  scrollProgress: RefObject<number>;
  onReady: () => void;
  onProgress: (p: number) => void;
  portal: RefObject<HTMLElement | null>;
};

export function Scene({ active, scrollProgress, onReady, onProgress, portal }: SceneProps) {
  const colors = useThemeColors();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const rig = useRef<CameraRigHandle>(null);
  const dive = () => rig.current?.dive();

  const world = (
    <>
      <Room colors={colors} onMonitorClick={dive} portal={portal} />
      <FloatingBadges portal={portal} />
    </>
  );

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: CAMERA_BASE.toArray(), fov: 30, near: 0.1, far: 50 }}
      gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(onReady)}
      className="!touch-pan-y"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#dfe7ff" />
      <pointLight
        position={[0.2, 0.6, -2.0]}
        intensity={2.2}
        distance={3.5}
        color={colors.accent}
      />
      <pointLight position={[-2.2, 0.9, -0.4]} intensity={1.4} distance={3} color={colors.accent} />

      <CameraRig ref={rig} scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {isMobile ? (
        <TapRotate>{world}</TapRotate>
      ) : (
        <PresentationControls
          global={false}
          cursor
          snap
          speed={1.2}
          polar={[-0.08, 0.15]}
          azimuth={[-0.45, 0.35]}
          enabled={!reducedMotion}
        >
          {world}
        </PresentationControls>
      )}

      {!isMobile && <Effects />}
      <ProgressReporter onProgress={onProgress} />
    </Canvas>
  );
}
