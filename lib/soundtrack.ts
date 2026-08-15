// Deezer's API is public — no key, no auth — and it carries the two things
// this needs that Apple's doesn't: a 30-second preview per track AND a `rank`,
// which is a real listener-popularity signal. Given a film, this finds its
// soundtrack album and picks the track people actually play, so the film on
// the homepage can play a bit of itself without anything curated by hand.
//
// Spotify was the other candidate: better popularity data, but it needs OAuth
// and it stopped returning preview_url for apps registered after Nov 2024 —
// good ranking, nothing to play.

export type Track = {
  // Deezer's track id, not a preview URL. Preview URLs are signed with an
  // expiry ~12 minutes out, so one stored in a built page is always dead by
  // the time someone clicks — /api/theme/[id] resolves a fresh one instead.
  id: number;
  name: string;
  artist: string;
  // where the preview came from, so it points somewhere
  link: string | null;
};

type Album = { id: number; title: string };

type DeezerTrack = {
  id: number;
  title: string;
  // the title with any "(from ...)" parenthetical already stripped
  title_short?: string;
  preview?: string;
  rank?: number;
  link?: string;
  artist?: { name?: string };
};

// Strip everything that varies between how Letterboxd and Deezer write a
// title, so "Spider-Man: Brand New Day" still matches "Spider Man Brand New
// Day".
function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function get(url: string) {
  const res = await fetch(url, {
    // soundtracks don't change; this is really just a build-time lookup
    next: { revalidate: 604800 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Deezer responded ${res.status}`);
  return res.json();
}

export async function getSoundtrack(title: string): Promise<Track | null> {
  try {
    const query = new URLSearchParams({
      q: `${title} original motion picture soundtrack`,
    });
    const albums: Album[] =
      (await get(`https://api.deezer.com/search/album?${query}`))?.data ?? [];

    // The top hit is usually right, but a film with no soundtrack release
    // returns somebody else's album — so require the film's name to actually
    // appear in the album's. Without this, searching one film happily returns
    // an unrelated soundtrack that merely ranks well.
    const wanted = normalize(title);
    const album = albums.find((entry) =>
      normalize(entry.title).includes(wanted)
    );
    if (!album) return null;

    const tracks: DeezerTrack[] = (
      (await get(`https://api.deezer.com/album/${album.id}`))?.tracks?.data ?? []
    ).filter((row: DeezerTrack) => row.preview);

    if (tracks.length === 0) return null;

    // Most-played track on the film's own album. Ranking within the album is
    // what keeps this honest — ranking across Deezer would drift to whatever
    // song merely shares the film's name.
    const track = tracks.reduce((best, row) =>
      (row.rank ?? 0) > (best.rank ?? 0) ? row : best
    );

    return {
      id: track.id,
      name: track.title_short?.trim() || track.title.trim(),
      artist: track.artist?.name ?? "",
      link: track.link ?? null,
    };
  } catch {
    // A missing soundtrack is the normal case for plenty of films, so this
    // never breaks the page — the film just renders without a play button.
    return null;
  }
}
