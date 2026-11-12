import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./env";
import * as schema from "./schema";

function createDb(url: string) {
  const client = postgres(url, { prepare: false, max: 1 });
  return drizzle(client, { schema });
}

export const db = env.DATABASE_URL ? createDb(env.DATABASE_URL) : null;
