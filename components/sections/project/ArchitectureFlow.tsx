import { Fragment } from "react";
import type { ArchNode } from "@/content/projects";
import { cn } from "@/lib/utils";

type ArchitectureFlowProps = {
  nodes: ArchNode[];
};

/** Static node flow; animated packets on the arrows are added in step 4. */
export function ArchitectureFlow({ nodes }: ArchitectureFlowProps) {
  return (
    <ol
      aria-label="Request flow"
      className="flex flex-col items-stretch gap-2 font-mono text-xs sm:flex-row sm:items-center"
    >
      {nodes.map((node, i) => (
        <Fragment key={node.label}>
          {i > 0 && (
            <li aria-hidden className="flex justify-center sm:flex-1">
              <span className="h-4 w-px bg-border-strong sm:h-px sm:w-full" />
            </li>
          )}
          <li
            className={cn(
              "rounded-control border px-3 py-2.5 text-center whitespace-nowrap",
              node.highlight
                ? "border-accent/60 bg-accent/10 text-accent"
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
