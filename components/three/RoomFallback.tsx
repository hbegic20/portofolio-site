"use client";

import Image from "next/image";
import { liteReasonLabel, ROOM_ALT } from "@/lib/detectLiteMode";
import { useUIStore } from "@/store/ui";
import roomStill from "@/public/fallback/room.webp";

export function RoomFallback() {
  const reason = useUIStore((s) => s.liteReason);
  const toggleLiteMode = useUIStore((s) => s.toggleLiteMode);

  return (
    <div className="relative h-full overflow-hidden rounded-card border border-border bg-surface-sunk">
      <Image
        src={roomStill}
        alt={ROOM_ALT}
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <p className="absolute top-3 left-3 flex flex-wrap items-center gap-x-2 rounded-[10px] border border-border-strong bg-surface/90 pl-2.5 font-mono text-[11px] text-text-muted backdrop-blur-sm">
        <span>
          {"// lite mode"}
          {reason && ` — ${liteReasonLabel[reason]}`}
        </span>
        <button
          type="button"
          onClick={toggleLiteMode}
          className="inline-flex min-h-11 items-center px-2.5 text-accent underline-offset-2 hover:underline"
        >
          turn 3D on
        </button>
      </p>
    </div>
  );
}
