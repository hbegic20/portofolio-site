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

export function useThemeColors(): ThemeColors {
  return useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      tokens.map((t) => [t, css.getPropertyValue(`--color-${t}`).trim() || "#ffffff"]),
    ) as ThemeColors;
  }, []);
}
