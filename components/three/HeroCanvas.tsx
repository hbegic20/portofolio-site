"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ROOM_ALT } from "@/lib/detectLiteMode";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIdleMount } from "@/lib/useIdleMount";
import { useUIStore } from "@/store/ui";
import { Loader } from "./Loader";
import { RoomFallback } from "./RoomFallback";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false });

/**
 * Hero 3D slot. The scene chunk (three, R3F, drei) only loads once the browser is idle,
 * renders only while on-screen, and fades/dollies out as the hero scrolls away.
 */
export function HeroCanvas() {
  const isLiteMode = useUIStore((s) => s.isLiteMode);
  const liteResolved = useUIStore((s) => s.liteResolved);
  const mounting = useIdleMount(liteResolved && !isLiteMode);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [onScreen, setOnScreen] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const onReady = useCallback(() => setReady(true), []);

  // Re-show the loader when 3D is switched back on (adjust state during render, not in an effect).
  const [prevLite, setPrevLite] = useState(isLiteMode);
  if (prevLite !== isLiteMode) {
    setPrevLite(isLiteMode);
    setReady(false);
  }

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (isLiteMode) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(wrap.current, {
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 80px",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => (scrollProgress.current = self.progress),
          },
        });
      });
      return () => mm.revert();
    },
    { scope: wrap, dependencies: [isLiteMode], revertOnUpdate: true },
  );

  return (
    <div ref={wrap} className="relative isolate aspect-[4/3.4] w-full">
      {isLiteMode ? (
        <RoomFallback />
      ) : (
        <div
          role="img"
          aria-label={`3D model: ${ROOM_ALT.toLowerCase()}`}
          className="absolute inset-0"
        >
          {mounting && (
            <Scene
              active={onScreen}
              scrollProgress={scrollProgress}
              onReady={onReady}
              onProgress={setProgress}
              portal={wrap}
            />
          )}
          <Loader mounting={mounting} progress={progress} done={ready} />
        </div>
      )}
    </div>
  );
}
