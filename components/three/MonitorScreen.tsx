"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture, SRGBColorSpace } from "three";
import type { TerminalLine } from "@/components/ui/Terminal";
import type { ThemeColors } from "@/lib/useThemeColors";

const lines: TerminalLine[] = [
  { kind: "cmd", text: "pnpm dev" },
  { kind: "out", text: "▲ ready on http://localhost:3000", tone: "ok" },
  { kind: "out", text: "GET /api/v1/me 200 in 9ms", tone: "muted" },
  { kind: "out", text: "GET /api/projects 200 in 14ms", tone: "muted" },
  { kind: "out", text: "POST /api/v1/contact 201 in 41ms", tone: "muted" },
];

const TEX_W = 1024;
const PAD = 44;
const FONT = 30;
const LINE = 48;
const BAR = 64;
const BLINK = 0.53;

type MonitorScreenProps = {
  colors: ThemeColors;
  position: [number, number, number];
  width: number;
  height: number;
  tilt?: number;
  onClick: () => void;
};

function monoFamily(): string {
  const family = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono");
  return family.trim() || "ui-monospace, monospace";
}

function draw(ctx: CanvasRenderingContext2D, c: ThemeColors, cursorOn: boolean) {
  const { width: w, height: h } = ctx.canvas;
  const font = monoFamily();
  const tones = { ok: c.ok, err: c.err, muted: c["text-subtle"] } as const;

  ctx.fillStyle = c["surface-sunk"];
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = c.border;
  ctx.fillRect(0, BAR, w, 2);
  [0, 1, 2].forEach((i) => {
    ctx.fillStyle = c["border-strong"];
    ctx.beginPath();
    ctx.arc(PAD + i * 30, BAR / 2, 9, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.font = `24px ${font}`;
  ctx.fillStyle = c["text-subtle"];
  ctx.textBaseline = "middle";
  ctx.fillText("~/dev-room — zsh", PAD + 110, BAR / 2 + 1);

  ctx.font = `${FONT}px ${font}`;
  ctx.textBaseline = "alphabetic";
  let y = BAR + PAD + FONT;
  for (const line of lines) {
    let x = PAD;
    if (line.kind === "cmd") {
      ctx.fillStyle = c.ok;
      ctx.fillText("$", x, y);
      x += ctx.measureText("$ ").width;
      ctx.fillStyle = c.text;
    } else {
      ctx.fillStyle = line.tone ? tones[line.tone] : c.text;
    }
    ctx.fillText(line.text, x, y);
    y += LINE;
  }

  ctx.fillStyle = c.ok;
  ctx.fillText("$", PAD, y);
  if (cursorOn) {
    ctx.fillStyle = c.text;
    ctx.fillRect(PAD + ctx.measureText("$ ").width, y - FONT + 4, FONT * 0.6, FONT);
  }
}

function createScreen(width: number, height: number, colors: ThemeColors) {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = Math.round((TEX_W * height) / width);
  const ctx = canvas.getContext("2d");
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;

  return {
    texture,
    render(cursorOn: boolean) {
      if (!ctx) return;
      draw(ctx, colors, cursorOn);
      texture.needsUpdate = true;
    },
    dispose: () => texture.dispose(),
  };
}

export function MonitorScreen({
  colors,
  position,
  width,
  height,
  tilt = 0,
  onClick,
}: MonitorScreenProps) {
  const cursor = useRef(true);
  const screen = useMemo(() => createScreen(width, height, colors), [width, height, colors]);

  useEffect(() => {
    screen.render(cursor.current);
    document.fonts.ready.then(() => screen.render(cursor.current));
    return screen.dispose;
  }, [screen]);

  useFrame(({ clock }) => {
    const on = Math.floor(clock.elapsedTime / BLINK) % 2 === 0;
    if (on === cursor.current) return;
    cursor.current = on;
    screen.render(on);
  });

  return (
    <mesh
      position={position}
      rotation={[tilt, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={screen.texture} toneMapped={false} />
    </mesh>
  );
}
