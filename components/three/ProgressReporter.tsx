"use client";

import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export function ProgressReporter({ onProgress }: { onProgress: (p: number) => void }) {
  const { progress } = useProgress();
  useEffect(() => onProgress(progress), [progress, onProgress]);
  return null;
}
