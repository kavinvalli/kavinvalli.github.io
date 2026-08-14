import Link from "next/link";
import { getLatestFilm, stars } from "../../lib/letterboxd";
import { letterboxdUser, now, nowUpdated } from "../../lib/now";
import { getAllPosts } from "../../lib/writing";
import * as s from "./styles";

type ResolvedEntry = {
  label: string;
  value: string;
  href?: string;
  note?: string;
  // rendered in accent, ahead of the note
  noteLead?: string;
};

// Entries marked `latestPost` / `latestFilm` are filled from live sources and
// drop out entirely when the source has nothing.
async function resolve(): Promise<ResolvedEntry[]> {
  const [latest] = getAllPosts();
  const film = now.some((entry) => entry.latestFilm)
    ? await getLatestFilm(letterboxdUser)
    : null;

  return now.flatMap((entry): ResolvedEntry[] => {
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

    if (entry.latestFilm) {
      if (!film) return [];
      const watched = film.watchedDate
        ? new Date(film.watchedDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })
        : null;

      return [
        {
          label: entry.label,
          value: film.year ? `${film.title} (${film.year})` : film.title,
          href: film.url,
          noteLead: film.rating !== null ? stars(film.rating) : undefined,
          note: entry.note ?? watched ?? undefined,
        },
      ];
    }

    if (!entry.value) return [];
    return [
      {
        label: entry.label,
        value: entry.value,
        href: entry.href,
        note: entry.note,
      },
    ];
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

export async function Now() {
  const entries = await resolve();
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
              {(entry.noteLead || entry.note) && (
                <dd className="mt-1 text-[0.75rem] leading-snug text-pretty text-muted">
                  {entry.noteLead && (
                    <span className="text-accent">{entry.noteLead}</span>
                  )}
                  {entry.noteLead && entry.note && " · "}
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
