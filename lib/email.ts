import "server-only";
import { Resend } from "resend";
import type { ContactInput } from "./validation";
import { env } from "./env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export const emailEnabled = Boolean(resend && env.CONTACT_TO_EMAIL);

export async function sendContactEmail(input: ContactInput): Promise<void> {
  if (!resend || !env.CONTACT_TO_EMAIL) {
    console.info(`[contact] email disabled — message: ${JSON.stringify(input)}`);
    return;
  }

  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: env.CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject: `New message from ${input.name}`,
    text: `${input.message}\n\n— ${input.name} <${input.email}>`,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}
