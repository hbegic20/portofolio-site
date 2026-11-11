"use client";

import { useIsMac } from "@/lib/useIsMac";
import { useUIStore } from "@/store/ui";

export function CommandButton() {
  const setPaletteOpen = useUIStore((s) => s.setPaletteOpen);
  const isMac = useIsMac();

  return (
    <button
      type="button"
      onClick={() => setPaletteOpen(true)}
      aria-haspopup="dialog"
      aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
      className="flex min-h-11 items-center gap-3 rounded-control border border-border-strong px-3 font-mono text-xs text-text-subtle transition-colors hover:border-text-subtle hover:text-text"
    >
      <span className="hidden sm:inline">Search or run a command</span>
      <span className="sm:hidden">Menu</span>
      <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px]">
        {isMac ? "⌘" : "Ctrl "}K
      </kbd>
    </button>
  );
}
