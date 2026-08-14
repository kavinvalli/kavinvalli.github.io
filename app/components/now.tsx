import Link from "next/link";
import { getLatestFilm, stars } from "../../lib/letterboxd";
import { letterboxdUser, now, nowUpdated } from "../../lib/now";
import { getSoundtrack } from "../../lib/soundtrack";
import type { Track } from "../../lib/soundtrack";
import { getAllPosts } from "../../lib/writing";
import { TrackPreview } from "./track-preview";
import * as s from "./styles";

type ResolvedEntry = {
  label: string;
  value: string;
  href?: string;
  note?: string;
  // rendered in accent, ahead of the note
  noteLead?: string;
  // a bit of the film's own soundtrack, when there's one to find
  track?: Track;
  // where a live entry gets its data, credited on the label row
  source?: { label: string; href: string };
};

// Entries marked `latestPost` / `latestFilm` are filled from live sources and
// drop out entirely when the source has nothing.
async function resolve(): Promise<ResolvedEntry[]> {
  const [latest] = getAllPosts();
  const film = now.some((entry) => entry.latestFilm)
    ? await getLatestFilm(letterboxdUser)
    : null;
  const track = film ? await getSoundtrack(film.title) : null;

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
          track: track ?? undefined,
          source: {
            label: "letterboxd",
            href: `https://letterboxd.com/${letterboxdUser}/films/diary/`,
          },
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
    <section className="section" data-reveal>
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
              {/* label left, live-data controls and credit right — keeps the
                  entry to three lines however much is attached to it */}
              <dt className="flex items-baseline justify-between gap-3 font-mono text-[0.62rem] lowercase tracking-wide text-faint">
                {/* the label carries its own credit; the player sits opposite */}
                <span className="flex min-w-0 items-baseline gap-1.5">
                  <span className="shrink-0">{entry.label}</span>
                  {entry.source && (
                    <>
                      <span aria-hidden="true" className="shrink-0">
                        ·
                      </span>
                      <a
                        href={entry.source.href}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-accent/55 transition-colors hover:text-accent-hover"
                      >
                        {entry.source.label} ↗
                      </a>
                    </>
                  )}
                </span>
                {entry.track && <TrackPreview track={entry.track} />}
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
