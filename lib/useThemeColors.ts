"use client";

import { useMemo } from "react";

const tokens = [
  "bg",
  "bg-alt",
  "surface",
  "surface-sunk",
  "border",
  "border-strong",
  "text",
  "text-subtle",
  "accent",
  "ok",
  "err",
  "code-kw",
  "code-str",
] as const;

export type ThemeColors = Record<(typeof tokens)[number], string>;

/** Reads the @theme colour tokens so the 3D scene uses the same palette as the page. */
export function useThemeColors(): ThemeColors {
  return useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      tokens.map((t) => [t, css.getPropertyValue(`--color-${t}`).trim() || "#ffffff"]),
    ) as ThemeColors;
  }, []);
}
