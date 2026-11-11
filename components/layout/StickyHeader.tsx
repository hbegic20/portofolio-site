"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Transparent at the top of the page; blurred surface once scrolled. */
export function StickyHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 border-b border-transparent transition-colors duration-300 data-[scrolled=true]:border-border data-[scrolled=true]:bg-bg/75 data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
