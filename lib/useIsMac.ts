"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True on Apple platforms; false during SSR so markup matches before hydration. */
export function useIsMac(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => true,
  );
}
