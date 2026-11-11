import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border-strong bg-surface-sunk px-2.5 py-1 font-mono text-xs text-text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
