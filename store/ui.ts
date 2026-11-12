import type Lenis from "lenis";
import { create } from "zustand";
import type { LiteReason } from "@/lib/detectLiteMode";

const PREF_KEY = "devroom:3d";

type UIState = {
  isLiteMode: boolean;
  liteReason: LiteReason | null;
  liteResolved: boolean;
  isPaletteOpen: boolean;
  lenis: Lenis | null;
  resolveLiteMode: (reason: LiteReason | null) => void;
  toggleLiteMode: () => void;
  setPaletteOpen: (open: boolean) => void;
  setLenis: (lenis: Lenis | null) => void;
};

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
  } catch {}
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
      return { isLiteMode, liteReason: "manual", liteResolved: true };
    }),
  setPaletteOpen: (isPaletteOpen) => set({ isPaletteOpen }),
  setLenis: (lenis) => set({ lenis }),
}));
