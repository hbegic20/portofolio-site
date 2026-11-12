"use client";

import { MotionConfig, motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  label: string;
  className?: string;
};

export function Tabs({ items, label, className }: TabsProps) {
  const [active, setActiveState] = useState(items[0]?.id);
  const [interacted, setInteracted] = useState(false);
  const setActive = (id: string) => {
    setInteracted(true);
    setActiveState(id);
  };
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const tabId = (id: string) => `${uid}-tab-${id}`;
  const panelId = (id: string) => `${uid}-panel-${id}`;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = items.findIndex((t) => t.id === active);
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight"
        ? current === last
          ? 0
          : current + 1
        : e.key === "ArrowLeft"
          ? current === 0
            ? last
            : current - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(items[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={className}>
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="flex [scrollbar-width:none] gap-1 overflow-x-auto border-b border-border"
        >
          {items.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(tab.id)}
                aria-selected={selected}
                aria-controls={panelId(tab.id)}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative min-h-11 shrink-0 px-2.5 font-mono text-[13px] transition-colors focus-visible:-outline-offset-2 sm:px-3 sm:text-sm",
                  selected ? "text-text" : "text-text-subtle hover:text-text-muted",
                )}
              >
                {tab.label}
                {selected && (
                  <motion.span
                    layoutId={`${uid}-underline`}
                    aria-hidden
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {items.map((tab) => {
          const selected = tab.id === active;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={panelId(tab.id)}
              aria-labelledby={tabId(tab.id)}
              hidden={!selected}
              tabIndex={0}
              className="pt-6 focus-visible:outline-offset-4"
            >
              {selected ? (
                <motion.div
                  initial={interacted ? { opacity: 0, y: 6 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {tab.content}
                </motion.div>
              ) : (
                tab.content
              )}
            </div>
          );
        })}
      </div>
    </MotionConfig>
  );
}
