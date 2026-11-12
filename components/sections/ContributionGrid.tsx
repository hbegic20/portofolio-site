import type { ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

const levelClass = ["bg-border", "bg-accent/25", "bg-accent/45", "bg-accent/70", "bg-accent"];

const MOBILE_WEEKS = 20;

type ContributionGridProps = {
  total: number;
  weeks: ContributionDay[][];
};

export function ContributionGrid({ total, weeks }: ContributionGridProps) {
  const totalLabel = total.toLocaleString("en");

  return (
    <figure className="flex flex-col gap-5 rounded-card border border-border bg-surface p-6">
      <figcaption className="font-mono text-xs text-text-subtle">
        <span className="text-ok">$</span> git shortlog --since=&quot;1 year ago&quot; →{" "}
        <span className="text-text">{totalLabel} contributions</span>
      </figcaption>

      <div
        role="img"
        aria-label={`GitHub contribution graph: ${totalLabel} contributions in the last year`}
        className="flex gap-[3px] lg:justify-between"
      >
        {weeks.map((week, w) => (
          <div
            key={week[0]?.date ?? w}
            className={cn(
              "grid grid-rows-7 gap-[3px]",
              w < weeks.length - MOBILE_WEEKS && "max-lg:hidden",
            )}
          >
            {week.map((day) => (
              <span
                key={day.date}
                title={`${day.count} on ${day.date}`}
                style={{ gridRowStart: new Date(day.date).getUTCDay() + 1 }}
                className={cn("size-[10px] rounded-[2px] lg:size-3", levelClass[day.level])}
              />
            ))}
          </div>
        ))}
      </div>

      <p
        aria-hidden
        className="flex items-center gap-1.5 self-end font-mono text-[11px] text-text-subtle"
      >
        less
        {levelClass.map((c) => (
          <span key={c} className={cn("size-[10px] rounded-[2px]", c)} />
        ))}
        more
      </p>
    </figure>
  );
}
