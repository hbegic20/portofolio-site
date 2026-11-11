import { z } from "zod";

/** Shared by the contact form (client) and /api/v1/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(80, "name is too long (max 80)"),
  email: z.email("that doesn't look like an email").trim(),
  message: z
    .string()
    .trim()
    .min(10, "message is too short (min 10 characters)")
    .max(4000, "message is too long (max 4000 characters)"),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactResponse =
  { ok: true } | { ok: false; error: string; fields?: Partial<Record<ContactField, string[]>> };
