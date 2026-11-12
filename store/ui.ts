import type Lenis from "lenis";
import { create } from "zustand";
import type { LiteReason } from "@/lib/detectLiteMode";

const PREF_KEY = "devroom:3d";
const LOG_SIZE = 3;

export type RequestLog = { line: string; ok: boolean; at: number };

type UIState = {
  isLiteMode: boolean;
  liteReason: LiteReason | null;
  liteResolved: boolean;
  isPaletteOpen: boolean;
  lenis: Lenis | null;
  requests: RequestLog[];
  logRequest: (method: string, path: string, status: number, ms: number) => void;
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
  requests: [],
  logRequest: (method, path, status, ms) =>
    set((s) => ({
      requests: [
        ...s.requests,
        {
          line: `${method} ${path} ${status || "ERR"} in ${ms}ms`,
          ok: status > 0 && status < 400,
          at: performance.now(),
        },
      ].slice(-LOG_SIZE),
    })),
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
