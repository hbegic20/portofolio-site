import type Lenis from "lenis";
import { create } from "zustand";
import type { LiteReason } from "@/lib/detectLiteMode";

const PREF_KEY = "devroom:3d";

type UIState = {
  /** 3D off: fallback image instead of canvas, no Lenis/scroll effects. */
  isLiteMode: boolean;
  /** Why lite mode is on; "manual" when the visitor chose either way, null when auto-on 3D. */
  liteReason: LiteReason | null;
  /** false until the client has run detection — 3D must not start before this. */
  liteResolved: boolean;
  isPaletteOpen: boolean;
  /** Active smooth-scroll instance, or null when native scrolling is used. */
  lenis: Lenis | null;
  /** Apply an auto-detected result; ignored once the visitor has chosen manually. */
  resolveLiteMode: (reason: LiteReason | null) => void;
  toggleLiteMode: () => void;
  setPaletteOpen: (open: boolean) => void;
  setLenis: (lenis: Lenis | null) => void;
};

/** Manual choice from ⌘K / the loader, remembered per browser ("on" | "off" | null). */
export function readStoredPref(): "on" | "off" | null {
  try {
    const v = localStorage.getItem(PREF_KEY);
    return v === "on" || v === "off" ? v : null;
  } catch {
    return null;
  }
}

function storePref(v: "on" | "off") {
  try {
    localStorage.setItem(PREF_KEY, v);
  } catch {
    // storage blocked (private mode etc.) — the choice just isn't remembered
  }
}

export const useUIStore = create<UIState>()((set) => ({
  isLiteMode: false,
  liteReason: null,
  liteResolved: false,
  isPaletteOpen: false,
  lenis: null,
  resolveLiteMode: (reason) =>
    set((s) =>
      s.liteReason === "manual"
        ? { liteResolved: true }
        : { isLiteMode: reason !== null, liteReason: reason, liteResolved: true },
    ),
  toggleLiteMode: () =>
    set((s) => {
      const isLiteMode = !s.isLiteMode;
      storePref(isLiteMode ? "off" : "on");
      // "manual" also marks a forced-on 3D so auto-detection stops overriding it.
      return { isLiteMode, liteReason: "manual", liteResolved: true };
    }),
  setPaletteOpen: (isPaletteOpen) => set({ isPaletteOpen }),
  setLenis: (lenis) => set({ lenis }),
}));
