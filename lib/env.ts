import "server-only";
import { z } from "zod";

const optional = z.preprocess((v) => (v === "" ? undefined : v), z.string().min(1).optional());

const schema = z.object({
  DATABASE_URL: optional,
  UPSTASH_REDIS_REST_URL: optional,
  UPSTASH_REDIS_REST_TOKEN: optional,
  RESEND_API_KEY: optional,
  CONTACT_TO_EMAIL: optional,
  CONTACT_FROM_EMAIL: optional,
  GITHUB_TOKEN: optional,
});

export const env = schema.parse(process.env);
