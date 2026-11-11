import { cacheLife } from "next/cache";
import { links } from "@/content/links";
import { profile } from "@/content/profile";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

async function getMe() {
  "use cache";
  cacheLife("hours");

  return {
    name: profile.name,
    role: profile.role,
    available: profile.available,
    status: profile.status,
    location: profile.location,
    timezone: profile.timezone,
    links: Object.fromEntries(links.map((l) => [l.id, l.href])),
  };
}

export async function GET() {
  return Response.json(await getMe(), { headers: cors });
}
