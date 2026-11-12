import "server-only";
import { cacheLife } from "next/cache";
import { z } from "zod";
import { env } from "./env";

const levels = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
] as const;

const responseSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          totalContributions: z.number(),
          weeks: z.array(
            z.object({
              contributionDays: z.array(
                z.object({
                  date: z.string(),
                  contributionCount: z.number(),
                  contributionLevel: z.enum(levels),
                }),
              ),
            }),
          ),
        }),
      }),
    }),
  }),
});

const query = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GitHubActivity = {
  total: number;
  weeks: ContributionDay[][];
};

export async function getGitHubActivity(login: string): Promise<GitHubActivity | null> {
  "use cache";
  cacheLife("hours");

  if (!env.GITHUB_TOKEN || /\[.*\]/.test(login)) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login } }),
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const parsed = responseSchema.safeParse(await res.json());
    if (!parsed.success) throw new Error("unexpected GitHub API response");

    const { contributionsCollection } = parsed.data.data.user;
    const calendar = contributionsCollection.contributionCalendar;

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: levels.indexOf(d.contributionLevel) as ContributionDay["level"],
        })),
      ),
    };
  } catch (err) {
    console.warn(`[github] ${err instanceof Error ? err.message : String(err)} — hiding grid`);
    return null;
  }
}
