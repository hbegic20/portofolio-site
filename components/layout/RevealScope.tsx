"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useUIStore } from "@/store/ui";

const ease = "expo.out";
const duration = 0.9;

/**
 * Wraps <main> and animates everything marked with data-reveal:
 * - "heading": slides up out of its overflow-hidden parent (the mask)
 * - "item": fades in and rises 24px, batched with a 0.06s stagger
 * Skipped entirely in lite mode and for prefers-reduced-motion.
 */
export function RevealScope({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLElement>(null);
  const isLiteMode = useUIStore((s) => s.isLiteMode);

  useGSAP(
    () => {
      if (isLiteMode) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal=heading]").forEach((el) => {
          gsap.from(el, {
            yPercent: 110,
            duration,
            ease,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        const items = gsap.utils.toArray<HTMLElement>("[data-reveal=item]");
        gsap.set(items, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration, ease, stagger: 0.06, overwrite: true }),
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [isLiteMode], revertOnUpdate: true },
  );

  return (
    <main id="main" ref={scope}>
      {children}
    </main>
  );
}
