import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type DeviceMockupProps = {
  media: Project["media"];
  name: string;
  flip?: boolean;
};

function Screen({ media, name, sizes }: { media: Project["media"]; name: string; sizes: string }) {
  if (!media) {
    return (
      <div className="flex h-full items-center justify-center font-mono text-[11px] text-text-subtle">
        [{name} screenshot]
      </div>
    );
  }
  if (media.type === "video") {
    return (
      <video
        src={media.src}
        aria-label={media.alt}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  return <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />;
}

export function DeviceMockup({ media, name, flip }: DeviceMockupProps) {
  return (
    <div className="relative px-2 pt-4 pb-10 perspective-[1600px]">
      <div
        className={cn(
          "transition-transform duration-700 transform-3d motion-reduce:transform-none",
          flip ? "rotate-y-[10deg]" : "-rotate-y-[10deg]",
          "rotate-x-[6deg]",
        )}
      >
        <div className="rounded-t-[14px] border border-border-strong bg-surface p-2.5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-surface-sunk">
            <Screen media={media} name={name} sizes="(min-width: 1024px) 560px, 90vw" />
          </div>
        </div>
        <div className="mx-[-4%] h-3 rounded-b-[10px] border border-t-0 border-border-strong bg-border" />
      </div>

      <div
        className={cn(
          "absolute bottom-0 w-[22%] rounded-[18px] border border-border-strong bg-surface p-1.5 shadow-2xl shadow-black/50",
          flip ? "left-0" : "right-0",
        )}
      >
        <div className="relative aspect-[9/19] overflow-hidden rounded-[13px] bg-surface-sunk">
          <Screen media={media} name="mobile" sizes="160px" />
        </div>
      </div>
    </div>
  );
}
