// What I'm up to. Edit this file — there's no API behind it.
// Bump `nowUpdated` when you change something, it's shown next to the heading.

export type NowEntry = {
  label: string;
  // omit when `latestPost` is set — the post supplies it
  value?: string;
  href?: string;
  // an aside, in your voice — set under the value in small type
  note?: string;
  // fills value + href from the newest published post, so this never goes stale
  latestPost?: boolean;
  // fills value + href + note from the most recent Letterboxd diary entry
  latestFilm?: boolean;
  // fills value + href + note from Goodreads: whatever is on the
  // currently-reading shelf, or the most recently finished book if nothing is
  latestBook?: boolean;
  // used in place of `label` when it falls back to a finished book
  finishedLabel?: string;
};

// whose Letterboxd diary `latestFilm` reads
export const letterboxdUser = "kavinvalli";

// the numeric id from a Goodreads profile URL, which `latestBook` reads
export const goodreadsUser = "113849536";

export const nowUpdated = "2026-08";

export const now: NowEntry[] = [
  {
    label: "building",
    value: "cloud coding agents at Replicas",
    href: "https://tryreplicas.com",
  },
  {
    label: "writing",
    latestPost: true,
  },
  {
    label: "reading",
    latestBook: true,
    finishedLabel: "last read",
    // without a note the author fills this line; set one to override
    // note: "the same book for about two months now — i almost only read when i travel 😭 (it's a great book though!)",
  },
  {
    label: "last watched",
    latestFilm: true,
  },
  {
    label: "studying",
    value: "computer engineering at Waterloo",
    href: "https://uwaterloo.ca",
    note: "this term: real-time operating systems, digital hardware systems, communication systems, analog control systems, and business technology & infrastructure",
  },
  // {
  //   label: "maintaining",
  //   value: "Typewind — typed Tailwind",
  //   href: "https://typewind.vercel.app",
  // },
  // { label: "listening", value: "…" },
  // { label: "somewhere", value: "…" },
];
