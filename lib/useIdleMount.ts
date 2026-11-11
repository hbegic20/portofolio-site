"use client";

import { useEffect, useState } from "react";

/**
 * true once the browser is idle (requestIdleCallback, with a setTimeout fallback for
 * Safari) or the user first interacts — whichever comes first.
 */
export function useIdleMount(enabled = true, timeout = 2000): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || ready) return;
    const go = () => setReady(true);
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));

    let cancel: () => void;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(go, { timeout });
      cancel = () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(go, 600);
      cancel = () => clearTimeout(id);
    }

    return () => {
      cancel();
      events.forEach((e) => window.removeEventListener(e, go));
    };
  }, [enabled, ready, timeout]);

  return ready;
}
