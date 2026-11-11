import type Lenis from "lenis";
import { create } from "zustand";

type UIState = {
  /** 3D off: fallback image instead of canvas, no Lenis/scroll effects. Auto-detected in step 7. */
  isLiteMode: boolean;
  isPaletteOpen: boolean;
  /** Active smooth-scroll instance, or null when native scrolling is used. */
  lenis: Lenis | null;
  toggleLiteMode: () => void;
  setPaletteOpen: (open: boolean) => void;
  setLenis: (lenis: Lenis | null) => void;
};

export const useUIStore = create<UIState>()((set) => ({
  isLiteMode: false,
  isPaletteOpen: false,
  lenis: null,
  toggleLiteMode: () => set((s) => ({ isLiteMode: !s.isLiteMode })),
  setPaletteOpen: (isPaletteOpen) => set({ isPaletteOpen }),
  setLenis: (lenis) => set({ lenis }),
}));
