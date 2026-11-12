"use client";

import { CornerDownLeft, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import { JsonView } from "./JsonView";

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | {
      kind: "done";
      status: number;
      statusText: string;
      ms: number;
      type: string;
      body: string;
      json: boolean;
    }
  | { kind: "error"; message: string };

const DEFAULT_PATH = "/api/v1/me";

export function ApiConsole() {
  const [path, setPath] = useState(DEFAULT_PATH);
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const logRequest = useUIStore((s) => s.logRequest);

  async function send(e: FormEvent) {
    e.preventDefault();
    const target = path.trim() || DEFAULT_PATH;
    if (!target.startsWith("/api/")) {
      setResult({ kind: "error", message: "only this site's /api/* routes can be queried" });
      return;
    }

    setResult({ kind: "loading" });
    const start = performance.now();
    try {
      const res = await fetch(target, { headers: { Accept: "application/json" } });
      const type = res.headers.get("content-type") ?? "";
      const raw = await res.text();
      const json = type.includes("application/json");
      let body = raw;
      if (json) {
        try {
          body = JSON.stringify(JSON.parse(raw), null, 2);
        } catch {}
      } else {
        body = raw.length > 400 ? `${raw.slice(0, 400)}…` : raw;
      }
      const ms = Math.round(performance.now() - start);
      logRequest("GET", target, res.status, ms);
      setResult({
        kind: "done",
        status: res.status,
        statusText: res.statusText,
        ms,
        type: type.split(";")[0] || "unknown",
        body,
        json,
      });
    } catch (err) {
      logRequest("GET", target, 0, Math.round(performance.now() - start));
      setResult({ kind: "error", message: err instanceof Error ? err.message : "network error" });
    }
  }

  const loading = result.kind === "loading";

  return (
    <>
      <form
        onSubmit={send}
        className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center"
      >
        <span className="w-fit rounded-md bg-ok/15 px-2.5 py-1 font-mono text-xs font-semibold text-ok">
          GET
        </span>
        <label htmlFor="api-path" className="sr-only">
          Request path
        </label>
        <input
          id="api-path"
          name="path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          className="min-h-11 flex-1 rounded-control border border-border bg-surface-sunk px-3 font-mono text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-accent px-5 text-sm font-medium text-on-accent transition-opacity disabled:opacity-70"
        >
          {loading ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          ) : (
            <CornerDownLeft aria-hidden className="size-4" />
          )}
          Send
        </button>
      </form>

      <div
        aria-live="polite"
        aria-busy={loading}
        className="min-h-48 overflow-x-auto bg-surface-sunk p-4 font-mono text-[13px] leading-6"
      >
        {result.kind === "idle" && (
          <p className="text-text-subtle">{"// press Send to make a real request"}</p>
        )}
        {result.kind === "loading" && <p className="text-text-subtle">sending request…</p>}
        {result.kind === "error" && <p className="text-err">error: {result.message}</p>}
        {result.kind === "done" && (
          <>
            <p className="text-text-subtle">
              <span className={cn(result.status < 400 ? "text-ok" : "text-err")}>
                {result.status} {result.statusText}
              </span>{" "}
              · {result.ms}ms · {result.type}
            </p>
            <pre className="mt-3 text-text-muted">
              {result.json ? <JsonView text={result.body} /> : result.body}
            </pre>
          </>
        )}
      </div>
    </>
  );
}
