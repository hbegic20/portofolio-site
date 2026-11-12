import { ImageResponse } from "next/og";
import { ogColors as c } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same prompt glyph as app/icon.svg, on a full-bleed square (iOS rounds the corners). */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: c.bg,
      }}
    >
      <svg width="132" height="132" viewBox="0 0 32 32">
        <path
          d="M8 11l5 5-5 5"
          fill="none"
          stroke={c.accent}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 21h8" stroke={c.ok} strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </div>,
    size,
  );
}
