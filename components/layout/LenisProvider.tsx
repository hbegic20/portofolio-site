"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { REDUCED_MOTION } from "@/lib/detectLiteMode";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useUIStore } from "@/store/ui";

/** Smooth scroll driven by the GSAP ticker. Off in lite mode and for reduced motion. */
export function LenisProvider() {
  const isLiteMode = useUIStore((s) => s.isLiteMode);
  const liteResolved = useUIStore((s) => s.liteResolved);
  const setLenis = useUIStore((s) => s.setLenis);

  useEffect(() => {
    if (!liteResolved || isLiteMode || window.matchMedia(REDUCED_MOTION).matches) return;

    const lenis = new Lenis({ autoRaf: false, anchors: true });
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [isLiteMode, liteResolved, setLenis]);

  return null;
}
