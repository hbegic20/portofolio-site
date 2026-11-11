import "server-only";
import { Resend } from "resend";
import type { ContactInput } from "./validation";
import { env } from "./env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

/** true when a real email will be sent (Resend key + recipient configured). */
export const emailEnabled = Boolean(resend && env.CONTACT_TO_EMAIL);

/**
 * Notifies the owner of a new message. Without Resend configured it logs to the
 * server console instead, so the flow still works locally.
 */
export async function sendContactEmail(input: ContactInput): Promise<void> {
  if (!resend || !env.CONTACT_TO_EMAIL) {
    console.info(`[contact] email disabled — message: ${JSON.stringify(input)}`);
    return;
  }

  const { error } = await resend.emails.send({
    // Resend's shared sender works until you verify your own domain.
    from: env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: env.CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject: `New message from ${input.name}`,
    text: `${input.message}\n\n— ${input.name} <${input.email}>`,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}
