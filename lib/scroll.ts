"use client";

import { useUIStore } from "@/store/ui";

/** Scroll to a section id, through Lenis when active, natively otherwise. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const { lenis } = useUIStore.getState();
  if (lenis) {
    lenis.scrollTo(target);
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
}
