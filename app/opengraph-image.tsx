import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { loadOgFonts, ogColors as c } from "@/lib/og";

export const alt = `${profile.name} — ${profile.role}. A 3D render of a cosy developer room.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Smaller JPEG copy of public/fallback/room.webp (Satori can't decode WebP).
const room = await readFile(join(process.cwd(), "assets/og/room.jpg"));
const roomSrc = `data:image/jpeg;base64,${room.toString("base64")}`;
const fonts = await loadOgFonts();

// Satori needs flex for mixed children, so the headline wraps word by word.
const { before, accent, after } = profile.hero.headline;
const split = (text: string, isAccent: boolean) =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => [w, isAccent] as const);
const words = [...split(before, false), ...split(accent, true), ...split(after, false)];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: c.bg,
        color: c.text,
        fontFamily: "Geist",
        padding: 64,
        gap: 48,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 28 }}>
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 26 }}>
          <span style={{ color: c.accent }}>~/{profile.handle}</span>
          <span style={{ color: c.subtle, marginLeft: 12 }}>$</span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 16,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
          }}
        >
          {words.map(([word, isAccent], i) => (
            <span key={i} style={{ color: isAccent ? c.accent : c.text }}>
              {word}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: c.muted,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: c.ok }} />
          {profile.name} · {profile.role.toLowerCase()}
        </div>
      </div>
      <img
        src={roomSrc}
        alt=""
        width={500}
        height={425}
        style={{ borderRadius: 20, border: `1px solid ${c.borderStrong}` }}
      />
    </div>,
    { ...size, fonts },
  );
}
