import { cn } from "@/lib/utils";

export type TerminalLine =
  { kind: "cmd"; text: string } | { kind: "out"; text: string; tone?: "ok" | "err" | "muted" };

type TerminalProps = {
  title: string;
  lines: TerminalLine[];
  /** Show a blinking cursor on a final empty prompt. */
  cursor?: boolean;
  className?: string;
};

const tones = { ok: "text-ok", err: "text-err", muted: "text-text-subtle" } as const;

export function Terminal({ title, lines, cursor = true, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-border-strong bg-surface-sunk font-mono text-[13px] leading-6 shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </span>
        <span className="ml-2 text-xs text-text-subtle">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 whitespace-pre-wrap">
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <div key={i}>
              <span className="text-ok">$</span> {line.text}
            </div>
          ) : (
            <div key={i} className={line.tone ? tones[line.tone] : "text-text-muted"}>
              {line.text}
            </div>
          ),
        )}
        {cursor && (
          <div>
            <span className="text-ok">$</span>{" "}
            <span aria-hidden className="inline-block h-4 w-2 animate-blink bg-text align-middle" />
          </div>
        )}
      </pre>
    </div>
  );
}
