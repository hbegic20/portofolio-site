import type { Project } from "@/content/projects";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArchitectureFlow } from "./ArchitectureFlow";

export type PanelKey = "overview" | "architecture" | "code" | "results";

export const panels: { key: PanelKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "architecture", label: "Architecture" },
  { key: "code", label: "Code" },
  { key: "results", label: "Results" },
];

function Labelled({ label, children }: { label: string; children: string }) {
  return (
    <p className="text-text-muted">
      <span className="font-mono text-sm text-accent">{label} →</span> {children}
    </p>
  );
}

type ProjectPanelProps = {
  project: Project;
  panel: PanelKey;
};

export function ProjectPanel({ project, panel }: ProjectPanelProps) {
  switch (panel) {
    case "overview":
      return (
        <div className="flex flex-col gap-4">
          <Labelled label="problem">{project.overview.problem}</Labelled>
          <Labelled label="built">{project.overview.built}</Labelled>
          <Labelled label="hard part">{project.overview.hardPart}</Labelled>
        </div>
      );
    case "architecture":
      return (
        <div className="flex flex-col gap-5">
          <ArchitectureFlow nodes={project.architecture.nodes} />
          <p className="text-text-muted">{project.architecture.tradeoff}</p>
        </div>
      );
    case "code":
      return <CodeBlock filename={project.code.filename} code={project.code.snippet} />;
    case "results":
      return (
        <div className="flex flex-col gap-5">
          <dl className="grid grid-cols-3 gap-3">
            {project.results.metrics.map((m, i) => (
              <div key={i} className="rounded-control border border-border bg-surface-sunk p-4">
                <dt className="font-mono text-[11px] text-text-subtle">{m.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">{m.value}</dd>
              </div>
            ))}
          </dl>
          <Labelled label="learned">{project.results.learned}</Labelled>
        </div>
      );
  }
}
