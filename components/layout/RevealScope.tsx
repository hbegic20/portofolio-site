"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useUIStore } from "@/store/ui";

const ease = "expo.out";
const duration = 0.9;

export function RevealScope({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLElement>(null);
  const isLiteMode = useUIStore((s) => s.isLiteMode);
  const liteResolved = useUIStore((s) => s.liteResolved);

  useGSAP(
    () => {
      if (!liteResolved || isLiteMode) return;
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
        gsap.set(items, { opacity: 0, y: 24 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            const passed = batch.filter((el) => el.getBoundingClientRect().bottom < 0);
            const visible = batch.filter((el) => !passed.includes(el));
            if (passed.length) gsap.set(passed, { opacity: 1, y: 0 });
            if (visible.length) {
              gsap.to(visible, {
                opacity: 1,
                y: 0,
                duration,
                ease,
                stagger: 0.06,
                overwrite: true,
              });
            }
          },
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [isLiteMode, liteResolved], revertOnUpdate: true },
  );

  return (
    <main id="main" ref={scope}>
      {children}
    </main>
  );
}
