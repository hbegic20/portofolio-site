"use client";

import { PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { REDUCED_MOTION } from "@/lib/detectLiteMode";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useThemeColors } from "@/lib/useThemeColors";
import { AutoSway } from "./AutoSway";
import { CameraRig, FRAMING, type CameraRigHandle } from "./CameraRig";
import { Effects } from "./Effects";
import { FloatingBadges } from "./FloatingBadges";
import { Room } from "./Room";
import { ProgressReporter } from "./ProgressReporter";

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
  const framing = isMobile ? FRAMING.mobile : FRAMING.desktop;

  const room = <Room colors={colors} onMonitorClick={dive} portal={portal} />;

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: framing.position.toArray(), fov: framing.fov, near: 0.1, far: 50 }}
      gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(onReady)}
      className="!touch-pan-y"
    >
      <ambientLight intensity={isMobile ? 0.85 : 0.55} />
      <directionalLight position={[4, 6, 3]} intensity={isMobile ? 1.4 : 1.1} color="#dfe7ff" />
      <pointLight
        position={[0.2, 0.6, -2.0]}
        intensity={2.2}
        distance={3.5}
        color={colors.accent}
      />
      <pointLight position={[-2.2, 0.9, -0.4]} intensity={1.4} distance={3} color={colors.accent} />

      <CameraRig
        ref={rig}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        framing={framing}
      />

      {isMobile ? (
        <AutoSway paused={reducedMotion}>{room}</AutoSway>
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
          {room}
          <FloatingBadges portal={portal} />
        </PresentationControls>
      )}

      {!isMobile && <Effects />}
      <ProgressReporter onProgress={onProgress} />
    </Canvas>
  );
}
