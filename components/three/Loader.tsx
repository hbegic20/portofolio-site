"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";

type LoaderProps = {
  /** Scene chunk requested (browser idle or first interaction). */
  mounting: boolean;
  /** drei useProgress, 0–100. */
  progress: number;
  /** First frame rendered. */
  done: boolean;
};

function Line({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <p>
      <span className={ok ? "text-ok" : "text-text-subtle"}>{ok ? "[ ok ]" : "[ .. ]"}</span>{" "}
      {children}
    </p>
  );
}

/** Terminal boot log over the canvas area only — page text is never blocked. */
export function Loader({ mounting, progress, done }: LoaderProps) {
  const toggleLiteMode = useUIStore((s) => s.toggleLiteMode);
  const [gone, setGone] = useState(false);
  const pct = done ? 100 : mounting ? Math.max(progress, 35) : 10;

  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey || el?.closest("input, textarea, [contenteditable]"))
        return;
      if (e.key.toLowerCase() === "s") toggleLiteMode();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, toggleLiteMode]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      onTransitionEnd={() => done && setGone(true)}
      className={cn(
        "absolute inset-0 flex flex-col justify-end gap-1.5 rounded-card border border-border bg-surface-sunk p-5 font-mono text-xs text-text-muted transition-opacity duration-700",
        done && "pointer-events-none opacity-0",
      )}
    >
      <p className="text-text-subtle">
        <span className="text-ok">$</span> ./boot-room.sh
      </p>
      <Line ok>page ready — 3D loads when the browser is idle</Line>
      <Line ok={mounting}>webgl context</Line>
      <Line ok={done}>loading room.glb … {Math.round(pct)}%</Line>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 hidden text-text-subtle md:block">
        press <kbd className="rounded border border-border px-1">S</kbd> to skip 3D
      </p>
    </div>
  );
}
