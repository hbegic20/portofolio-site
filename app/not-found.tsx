import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `404 — ${profile.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-dvh items-center overflow-hidden py-16">
      <p
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center text-[clamp(180px,32vw,460px)] leading-none font-semibold tracking-[-0.06em] text-text/[0.035] select-none"
      >
        404
      </p>

      <Container className="flex flex-col items-start gap-8">
        <Link href="/" className="font-mono text-sm">
          <span className="text-accent">~/{profile.handle}</span>{" "}
          <span className="text-text-subtle">$</span>
        </Link>

        <div className="w-full max-w-xl rounded-card border border-border-strong bg-surface-sunk p-5 font-mono text-sm leading-7">
          <p>
            <span className="text-ok">$</span> cd /this-page
          </p>
          <p className="text-err">cd: no such file or directory: /this-page</p>
          <p>
            <span className="text-ok">$</span>{" "}
            <span
              aria-hidden
              className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-text"
            />
          </p>
        </div>

        <h1 className="text-h2 leading-none font-semibold tracking-[-0.04em]">
          This page doesn&apos;t exist.
        </h1>
        <p className="max-w-[48ch] text-text-muted">
          Everything lives on one page — head back home or jump straight to the projects.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button href="/">
            <ArrowLeft aria-hidden className="size-4" /> Back home
          </Button>
          <Button href="/#projects" variant="outline">
            <FolderGit2 aria-hidden className="size-4" /> See projects
          </Button>
        </div>
      </Container>
    </main>
  );
}
