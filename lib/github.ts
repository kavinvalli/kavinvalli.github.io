// GitHub's contribution calendar is only exposed via the GraphQL API, which
// requires a token even for public data. Set GITHUB_TOKEN (classic PAT,
// read:user scope) locally in .env.local and in the Vercel project settings.
// Without it, callers get null and the section simply doesn't render.

export const CONTRIBUTIONS_TAG = "github-contributions";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  total: number;
  weeks: ContributionDay[][];
};

const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function getContributions(
  login: string
): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res: Response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      // Contributions change at most a few times a day; hourly is plenty.
      // Tagged so it can be purged on demand via revalidateTag(CONTRIBUTIONS_TAG).
      next: { revalidate: 3600, tags: [CONTRIBUTIONS_TAG] },
    });

    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

    const json = await res.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) throw new Error("GitHub returned no contribution calendar");

    const weeks: ContributionDay[][] = calendar.weeks.map(
      (week: {
        contributionDays: {
          date: string;
          weekday: number;
          contributionCount: number;
          contributionLevel: string;
        }[];
      }) => {
        // Pad partial first/last weeks so every column has 7 slots.
        const days: ContributionDay[] = Array.from({ length: 7 }, () => ({
          date: "",
          count: 0,
          level: 0 as const,
        }));
        for (const day of week.contributionDays) {
          days[day.weekday] = {
            date: day.date,
            count: day.contributionCount,
            level: LEVELS[day.contributionLevel] ?? 0,
          };
        }
        return days;
      }
    );

    return { total: calendar.totalContributions, weeks };
  } catch (err) {
    // Rethrow at runtime so the ISR regeneration fails and Next keeps serving
    // the last good page — a stale graph beats a vanished one. Swallow during
    // the production build, where there is no previous page to fall back to
    // and a GitHub blip would otherwise break the deploy.
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn("[contributions] skipped at build time:", err);
      return null;
    }
    throw err;
  }
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// A label sits above the first week that lands in a new month, matching how
// GitHub aligns its own column headers.
export function monthLabels(weeks: ContributionDay[][]): (string | null)[] {
  let last = -1;
  return weeks.map((week, i) => {
    const first = week.find((day) => day.date);
    if (!first) return null;
    const month = new Date(first.date).getUTCMonth();
    if (month === last) return null;
    last = month;
    // Skip a label that would be clipped at the very end of the grid.
    if (i === weeks.length - 1) return null;
    return MONTHS[month];
  });
}
