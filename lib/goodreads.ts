// Goodreads shut its public API in December 2020 and hasn't issued a key
// since, but the per-shelf RSS feed still works and needs no auth — same deal
// as Letterboxd. It's undocumented, so treat it as something that may vanish:
// every failure path returns null and the `now` entry quietly drops out.
//
// The feed is keyed by numeric user id (the number in a profile URL) and only
// responds for a public profile.

export type Shelf = "currently-reading" | "read";

export type Book = {
  title: string;
  author: string;
  // 0 when unrated — Goodreads uses whole stars only
  rating: number;
  addedAt: string | null;
  url: string;
};

const UA = "kavin.me (+https://kavin.me)";

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    // Goodreads writes apostrophes as &apos; and &#39; interchangeably
    .replace(/&#x([0-9a-f]+);/gi, (m, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch {
        return m;
      }
    })
    .replace(/&#(\d+);/g, (m, dec) => {
      try {
        return String.fromCodePoint(Number(dec));
      } catch {
        return m;
      }
    })
    .trim();
}

function tag(block: string, name: string): string | null {
  const match = block.match(
    new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`)
  );
  if (!match) return null;
  return decode(match[1]) || null;
}

export async function getShelf(
  userId: string,
  shelf: Shelf
): Promise<Book | null> {
  try {
    const res = await fetch(
      `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}`,
      {
        headers: { "User-Agent": UA },
        signal: AbortSignal.timeout(8000),
        next: { revalidate: 21600 },
      }
    );
    if (!res.ok) return null;

    const xml = await res.text();
    const books = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, block]) => block)
      .flatMap((block): Book[] => {
        const title = tag(block, "title");
        const id = tag(block, "book_id");
        if (!title || !id) return [];

        const added = tag(block, "user_date_added");
        return [
          {
            title,
            author: tag(block, "author_name") ?? "",
            rating: Number(tag(block, "user_rating") ?? 0) || 0,
            addedAt: added,
            // the feed's own <link> is a review URL trailing utm params
            url: `https://www.goodreads.com/book/show/${id}`,
          },
        ];
      })
      // newest first; the feed's order isn't guaranteed
      .sort((a, b) => {
        const at = a.addedAt ? Date.parse(a.addedAt) : 0;
        const bt = b.addedAt ? Date.parse(b.addedAt) : 0;
        return bt - at;
      });

    return books[0] ?? null;
  } catch {
    return null;
  }
}

export function bookStars(rating: number): string {
  return rating > 0 ? "★".repeat(rating) : "";
}

// What's on the go if there is anything, otherwise the last one finished. The
// shelf comes back with it because the caller has to relabel — calling a book
// you finished "reading" is exactly the kind of stale line this replaced.
export async function getCurrentBook(
  userId: string
): Promise<{ book: Book; shelf: Shelf } | null> {
  const reading = await getShelf(userId, "currently-reading");
  if (reading) return { book: reading, shelf: "currently-reading" };

  const finished = await getShelf(userId, "read");
  return finished ? { book: finished, shelf: "read" } : null;
}

export function profileUrl(userId: string): string {
  return `https://www.goodreads.com/user/show/${userId}`;
}
