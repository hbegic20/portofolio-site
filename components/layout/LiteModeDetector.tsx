"use client";

import { useEffect } from "react";
import { detectLiteMode, REDUCED_MOTION } from "@/lib/detectLiteMode";
import { readStoredPref, useUIStore } from "@/store/ui";

/**
 * Decides once on the client whether to run 3D: a remembered ⌘K choice wins, otherwise
 * reduced motion, data saver, ≤ 4 cores or missing WebGL2 switch lite mode on.
 */
export function LiteModeDetector() {
  useEffect(() => {
    const pref = readStoredPref();
    if (pref) {
      useUIStore.setState({ isLiteMode: pref === "off", liteReason: "manual", liteResolved: true });
    } else {
      useUIStore.getState().resolveLiteMode(detectLiteMode());
    }

    // Follow OS reduced-motion changes live (no-op once the visitor chose manually).
    const mql = window.matchMedia(REDUCED_MOTION);
    const onChange = () => useUIStore.getState().resolveLiteMode(detectLiteMode());
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return null;
}
