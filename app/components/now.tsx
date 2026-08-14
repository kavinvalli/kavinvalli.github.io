import Link from "next/link";
import { now, nowUpdated } from "../../lib/now";
import { getAllPosts } from "../../lib/writing";
import * as s from "./styles";

type ResolvedEntry = {
  label: string;
  value: string;
  href?: string;
  note?: string;
};

// Entries marked `latestPost` are filled from the newest published post, and
// drop out entirely if there isn't one.
function resolve(): ResolvedEntry[] {
  const [latest] = getAllPosts();

  return now.flatMap((entry) => {
    if (entry.latestPost) {
      if (!latest) return [];
      return [
        {
          label: entry.label,
          value: latest.title,
          href: `/writing/${latest.slug}`,
          note: entry.note,
        },
      ];
    }
    return entry.value ? [{ ...entry, value: entry.value }] : [];
  });
}

function updatedLabel(value: string) {
  const [year, month] = value.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, 1))
    // timeZone must be UTC — otherwise a UTC-midnight first-of-month formats
    // as the previous month in any negative-offset timezone.
    .toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    .toLowerCase();
}

export function Now() {
  const entries = resolve();
  if (entries.length === 0) return null;

  return (
    <section className="section">
      <div className={`${s.sectionHead} breakout`}>
        <p className={s.sectionLabel}>Now</p>
        <span className={s.sectionAll}>updated {updatedLabel(nowUpdated)}</span>
      </div>

      <dl className="breakout grid gap-x-10 sm:grid-cols-2">
        {entries.map((entry) => {
          const external = entry.href?.startsWith("http");
          return (
            <div
              key={entry.label}
              className="border-b border-dashed border-line py-3"
            >
              <dt className="font-mono text-[0.62rem] lowercase tracking-wide text-faint">
                {entry.label}
              </dt>
              <dd className="mt-1 font-serif text-[1.15rem] leading-snug text-foreground">
                {!entry.href ? (
                  entry.value
                ) : external ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent-hover"
                  >
                    {entry.value}
                  </a>
                ) : (
                  <Link
                    href={entry.href}
                    className="transition-colors hover:text-accent-hover"
                  >
                    {entry.value}
                  </Link>
                )}
              </dd>
              {entry.note && (
                <dd className="mt-1 text-[0.75rem] leading-snug text-pretty text-muted">
                  {entry.note}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
