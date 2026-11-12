"use client";

import { CornerDownLeft, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactField, type ContactResponse } from "@/lib/validation";
import { useUIStore } from "@/store/ui";
import { Field } from "./Field";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; name: string }
  | { kind: "error"; message: string };

type FieldErrors = Partial<Record<ContactField, string[]>>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const logRequest = useUIStore((s) => s.logRequest);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fields = z.flattenError(parsed.error).fieldErrors;
      setErrors(fields);
      setStatus({ kind: "error", message: "validation failed" });
      const first = (["name", "email", "message"] as const).find((f) => fields[f]);
      const el = first ? form.elements.namedItem(first) : null;
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });
    const start = performance.now();
    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      logRequest("POST", "/api/v1/contact", res.status, Math.round(performance.now() - start));
      const data = (await res.json()) as ContactResponse;
      if (data.ok) {
        setStatus({ kind: "ok", name: parsed.data.name });
        form.reset();
      } else {
        setErrors(data.fields ?? {});
        setStatus({ kind: "error", message: `${res.status} ${data.error}` });
      }
    } catch {
      logRequest("POST", "/api/v1/contact", 0, Math.round(performance.now() - start));
      setStatus({ kind: "error", message: "network error — check your connection and retry" });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field name="name" label="--name" errors={errors.name} autoComplete="name" maxLength={80} />
      <Field name="email" label="--email" errors={errors.email} type="email" autoComplete="email" />
      <Field name="message" label="--message" errors={errors.message} multiline maxLength={4000} />

      <div aria-hidden className="hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-control bg-accent px-5 text-sm font-medium text-on-accent transition-opacity disabled:opacity-70"
        >
          Execute
          {sending ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          ) : (
            <CornerDownLeft aria-hidden className="size-4" />
          )}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "font-mono text-sm",
            status.kind === "ok" && "text-ok",
            status.kind === "error" && "text-err",
            status.kind === "sending" && "text-text-subtle",
          )}
        >
          {status.kind === "sending" && "$ ./say-hello.sh … sending"}
          {status.kind === "ok" && `[ ok ] message sent — thanks, ${status.name}. I'll reply soon.`}
          {status.kind === "error" && `[ err ] ${status.message}`}
        </p>
      </div>
    </form>
  );
}
