import { z } from "zod";
import { db } from "@/lib/db";
import { emailEnabled, sendContactEmail } from "@/lib/email";
import { clientIp, contactRatelimit } from "@/lib/ratelimit";
import { messages } from "@/lib/schema";
import { contactSchema, type ContactResponse } from "@/lib/validation";

function reply(body: ContactResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ ok: false, error: "invalid JSON body" }, 400);
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (typeof body === "object" && body !== null && "company" in body && body.company) {
    return reply({ ok: true }, 201);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return reply(
      { ok: false, error: "validation failed", fields: z.flattenError(parsed.error).fieldErrors },
      422,
    );
  }
  const { name, email, message } = parsed.data;

  if (contactRatelimit) {
    const { success, reset } = await contactRatelimit.limit(clientIp(request.headers));
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return reply({ ok: false, error: "too many messages — try again later" }, 429, {
        "Retry-After": String(retryAfter),
      });
    }
  }

  // In production at least one delivery channel must exist, or the message would vanish.
  if (!db && !emailEnabled && process.env.NODE_ENV === "production") {
    console.error("[contact] neither DATABASE_URL nor Resend is configured");
    return reply({ ok: false, error: "contact form is not configured yet" }, 503);
  }

  try {
    if (db) await db.insert(messages).values({ name, email, message });
  } catch (err) {
    console.error("[contact] db insert failed", err);
    return reply({ ok: false, error: "couldn't save your message" }, 500);
  }

  try {
    await sendContactEmail({ name, email, message });
  } catch (err) {
    // Saved to the DB already; a failed notification shouldn't fail the request.
    console.error("[contact] email failed", err);
    if (!db) return reply({ ok: false, error: "couldn't deliver your message" }, 502);
  }

  return reply({ ok: true }, 201);
}
