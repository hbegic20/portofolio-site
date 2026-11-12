export type LiteReason = "manual" | "reduced-motion" | "no-webgl2" | "low-cpu" | "save-data";

export const ROOM_ALT = "A cosy developer room with a desk, monitor and server rack";

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

function hasWebGL2(): boolean {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

/** First reason this device should get the static room instead of WebGL, or null. */
export function detectLiteMode(): LiteReason | null {
  const nav = navigator as NavigatorWithConnection;
  if (window.matchMedia(REDUCED_MOTION).matches) return "reduced-motion";
  if (nav.connection?.saveData) return "save-data";
  if (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) return "low-cpu";
  if (!hasWebGL2()) return "no-webgl2";
  return null;
}

export const liteReasonLabel: Record<LiteReason, string> = {
  manual: "3D switched off",
  "reduced-motion": "reduced motion is on",
  "no-webgl2": "WebGL2 isn't available",
  "low-cpu": "saving your CPU",
  "save-data": "data saver is on",
};
