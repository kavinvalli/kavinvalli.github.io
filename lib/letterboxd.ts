// Letterboxd publishes a public RSS feed per member — no key, no auth, no
// expiring token. Films only; Letterboxd doesn't track TV.

export type Film = {
  title: string;
  year: string | null;
  rating: number | null;
  watchedDate: string | null;
  url: string;
};

function tag(block: string, name: string): string | null {
  const match = block.match(
    new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`)
  );
  if (!match) return null;
  const value = match[1]
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .trim();
  return value || null;
}

export async function getLatestFilm(username: string): Promise<Film | null> {
  try {
    const res = await fetch(`https://letterboxd.com/${username}/rss/`, {
      headers: { "User-Agent": "kavin.me (+https://kavin.me)" },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;

    const xml = await res.text();
    const films = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, block]) => block)
      // the feed also carries list and review entries; only diary items
      // have a film title
      .filter((block) => tag(block, "letterboxd:filmTitle"))
      .map((block): Film => {
        const rating = tag(block, "letterboxd:memberRating");
        return {
          title: tag(block, "letterboxd:filmTitle")!,
          year: tag(block, "letterboxd:filmYear"),
          rating: rating ? Number(rating) : null,
          watchedDate: tag(block, "letterboxd:watchedDate"),
          url: tag(block, "link") ?? `https://letterboxd.com/${username}/`,
        };
      })
      // feed order tracks when entries were logged, not when films were
      // watched — sort so "latest" means most recently seen
      .sort((a, b) => (a.watchedDate ?? "") < (b.watchedDate ?? "") ? 1 : -1);

    return films[0] ?? null;
  } catch {
    return null;
  }
}

export function stars(rating: number): string {
  const full = Math.floor(rating);
  return "★".repeat(full) + (rating - full >= 0.5 ? "½" : "");
}
