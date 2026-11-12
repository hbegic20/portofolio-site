"use client";

import { useEffect } from "react";
import { detectLiteMode, REDUCED_MOTION } from "@/lib/detectLiteMode";
import { readStoredPref, useUIStore } from "@/store/ui";

export function LiteModeDetector() {
  useEffect(() => {
    const pref = readStoredPref();
    if (pref) {
      useUIStore.setState({ isLiteMode: pref === "off", liteReason: "manual", liteResolved: true });
    } else {
      useUIStore.getState().resolveLiteMode(detectLiteMode());
    }

    const mql = window.matchMedia(REDUCED_MOTION);
    const onChange = () => useUIStore.getState().resolveLiteMode(detectLiteMode());
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return null;
}
