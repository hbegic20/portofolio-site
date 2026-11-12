import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Satori (next/og) can't read CSS variables, so the generated images use this mirror of
 * the @theme tokens in app/globals.css — keep the two in sync when changing the accent.
 */
export const ogColors = {
  bg: "#0A0E1A",
  surface: "#0E1426",
  border: "#1F2640",
  borderStrong: "#252C40",
  text: "#E6EAF5",
  muted: "#AEB5C8",
  subtle: "#8B93A8",
  accent: "#38BDF8",
  ok: "#4ADE80",
} as const;

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");

export async function loadOgFonts() {
  const [sans, mono] = await Promise.all([
    readFile(join(fontDir, "geist-sans/Geist-SemiBold.ttf")),
    readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
  ]);
  return [
    { name: "Geist", data: sans, weight: 600 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}
