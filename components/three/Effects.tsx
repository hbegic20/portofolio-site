"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom mipmapBlur luminanceThreshold={0.9} luminanceSmoothing={0.2} intensity={0.55} />
    </EffectComposer>
  );
}
