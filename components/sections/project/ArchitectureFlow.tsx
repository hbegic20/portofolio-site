import { Fragment } from "react";
import type { ArchNode } from "@/content/projects";
import { cn } from "@/lib/utils";

type ArchitectureFlowProps = {
  nodes: ArchNode[];
};

export function ArchitectureFlow({ nodes }: ArchitectureFlowProps) {
  return (
    <ol
      aria-label="Request flow"
      className="flex flex-col items-stretch font-mono text-xs sm:flex-row sm:items-center"
    >
      {nodes.map((node, i) => (
        <Fragment key={node.label}>
          {i > 0 && (
            <li aria-hidden className="flex justify-center py-1 sm:flex-1 sm:px-1 sm:py-0">
              <span className="relative block h-6 w-px bg-border-strong sm:h-px sm:w-full sm:min-w-6">
                <span
                  className="absolute left-1/2 size-1.5 -translate-1/2 animate-packet-y rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/50 motion-reduce:hidden sm:top-1/2 sm:animate-packet-x"
                  style={{ animationDelay: `${(i - 1) * 0.3}s` }}
                />
              </span>
            </li>
          )}
          <li
            className={cn(
              "rounded-control border px-3 py-2.5 text-center whitespace-nowrap",
              node.highlight
                ? "border-accent/60 bg-accent/10 text-accent shadow-[0_0_24px_-6px] shadow-accent/40"
                : "border-border-strong bg-surface-sunk text-text-muted",
            )}
          >
            {node.label}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
