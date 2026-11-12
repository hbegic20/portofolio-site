"use client";

import { Command } from "cmdk";
import { Box, Copy, CornerDownLeft, FileDown, Hash, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { links } from "@/content/links";
import { profile } from "@/content/profile";
import { sections } from "@/content/sections";
import { scrollToId } from "@/lib/scroll";
import { useUIStore } from "@/store/ui";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon | typeof GithubIcon;
  keywords?: string[];
  run: () => void;
};

const itemClass =
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-control px-3 text-sm text-text-muted data-[selected=true]:bg-surface data-[selected=true]:text-text";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-text-subtle";

export function CommandPalette() {
  const open = useUIStore((s) => s.isPaletteOpen);
  const setOpen = useUIStore((s) => s.setPaletteOpen);
  const isLiteMode = useUIStore((s) => s.isLiteMode);
  const toggleLiteMode = useUIStore((s) => s.toggleLiteMode);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!useUIStore.getState().isPaletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const { lenis } = useUIStore.getState();
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>("[cmdk-input]")?.focus();
      lenis?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) lenis?.start();
  }, [open]);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(""), 2500);
    return () => clearTimeout(t);
  }, [status]);

  const navigate: Item[] = sections.map((s) => ({
    id: `go-${s.id}`,
    label: s.id === "top" ? "Back to top" : `./${s.slug}`,
    hint: s.title,
    icon: Hash,
    keywords: [s.slug, s.title ?? ""],
    run: () => scrollToId(s.id),
  }));

  const actions: Item[] = [
    {
      id: "copy-email",
      label: "Copy email",
      hint: profile.email,
      icon: Copy,
      keywords: ["mail", "contact"],
      run: () => {
        navigator.clipboard.writeText(profile.email).then(
          () => setStatus(`Copied ${profile.email}`),
          () => setStatus("Couldn't access the clipboard"),
        );
      },
    },
    {
      id: "toggle-3d",
      label: isLiteMode ? "Turn 3D on" : "Turn 3D off (lite mode)",
      hint: "Toggle 3D",
      icon: Box,
      keywords: ["3d", "lite", "performance", "room"],
      run: () => {
        toggleLiteMode();
        setStatus(isLiteMode ? "3D on" : "Lite mode on — 3D off");
      },
    },
    {
      id: "open-cv",
      label: "Open CV (PDF)",
      icon: FileDown,
      keywords: ["resume", "download"],
      run: () => window.open(profile.cvUrl, "_blank", "noopener"),
    },
    ...links
      .filter((l) => l.id !== "email")
      .map<Item>((l) => ({
        id: `open-${l.id}`,
        label: `Open ${l.label}`,
        icon: l.id === "github" ? GithubIcon : LinkedinIcon,
        run: () => window.open(l.href, "_blank", "noopener"),
      })),
  ];

  const select = (item: Item) => {
    useUIStore.getState().lenis?.start();
    setOpen(false);
    item.run();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label="Command palette"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        className="m-auto mt-[12vh] w-[min(640px,calc(100vw-32px))] rounded-card border border-border-strong bg-surface-sunk p-0 text-text shadow-2xl shadow-black/60 backdrop:bg-bg/70 backdrop:backdrop-blur-sm"
      >
        {open && (
          <Command label="Command palette" loop className="flex flex-col">
            <div className="flex items-center gap-3 border-b border-border px-4">
              <span aria-hidden className="font-mono text-sm text-ok">
                $
              </span>
              <Command.Input
                placeholder="Type a command or search…"
                className="h-14 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-text-subtle"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-text-subtle">
                esc
              </kbd>
            </div>
            <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-3 py-6 font-mono text-sm text-text-subtle">
                command not found
              </Command.Empty>
              {[
                { heading: "navigate", items: navigate },
                { heading: "actions", items: actions },
              ].map((group) => (
                <Command.Group key={group.heading} heading={group.heading} className={groupClass}>
                  {group.items.map((item) => (
                    <Command.Item
                      key={item.id}
                      value={item.id}
                      keywords={[item.label, ...(item.keywords ?? [])]}
                      onSelect={() => select(item)}
                      className={itemClass}
                    >
                      <item.icon aria-hidden className="size-4 shrink-0 text-text-subtle" />
                      <span className="font-mono">{item.label}</span>
                      {item.hint && (
                        <span className="ml-auto truncate text-xs text-text-subtle">
                          {item.hint}
                        </span>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
            <div className="flex items-center gap-2 border-t border-border px-4 py-2.5 font-mono text-[11px] text-text-subtle">
              <CornerDownLeft aria-hidden className="size-3" /> run · ↑↓ navigate
            </div>
          </Command>
        )}
      </dialog>

      <p
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-control border border-border-strong bg-surface px-4 py-2.5 font-mono text-xs text-ok shadow-xl transition-opacity empty:opacity-0"
      >
        {status}
      </p>
    </>
  );
}
