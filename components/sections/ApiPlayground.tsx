import { CornerDownLeft } from "lucide-react";
import { getSection } from "@/content/sections";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Static shell; the real fetch to /api/v1/me is wired up in step 5. */
export function ApiPlayground() {
  return (
    <Section id="api" alt>
      <SectionHeading section={getSection("api")} />
      <p data-reveal="item" className="mt-4 max-w-[56ch] text-text-muted">
        This site has a real API. Send a request and read the response.
      </p>

      <Card data-reveal="item" className="mt-10 overflow-hidden">
        <form className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <span className="w-fit rounded-md bg-ok/15 px-2.5 py-1 font-mono text-xs font-semibold text-ok">
            GET
          </span>
          <label htmlFor="api-path" className="sr-only">
            Request path
          </label>
          <input
            id="api-path"
            name="path"
            defaultValue="/api/v1/me"
            spellCheck={false}
            className="min-h-11 flex-1 rounded-control border border-border bg-surface-sunk px-3 font-mono text-sm"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-accent px-5 text-sm font-medium text-on-accent"
          >
            Send <CornerDownLeft aria-hidden className="size-4" />
          </button>
        </form>
        <div className="min-h-48 bg-surface-sunk p-4 font-mono text-[13px] leading-6 text-text-subtle">
          {"// response will appear here"}
        </div>
      </Card>
    </Section>
  );
}
