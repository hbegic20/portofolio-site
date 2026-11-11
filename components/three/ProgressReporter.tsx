"use client";

import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

/** Forwards drei's loading progress (0–100) out of the lazily loaded scene chunk. */
export function ProgressReporter({ onProgress }: { onProgress: (p: number) => void }) {
  const { progress } = useProgress();
  useEffect(() => onProgress(progress), [progress, onProgress]);
  return null;
}
