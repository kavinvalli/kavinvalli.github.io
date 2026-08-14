// Open Graph metadata for outbound links, used to build hover cards.
// Fetched at build and revalidated weekly — these are stable marketing pages,
// not something that changes hourly. Anything that fails or has too little
// metadata returns null, and the link renders as a plain link.

export type LinkPreview = {
  url: string;
  domain: string;
  title: string;
  description: string | null;
  image: string | null;
  favicon: string | null;
};

const UA =
  "Mozilla/5.0 (compatible; kavin.me link preview; +https://kavin.me)";

function meta(html: string, key: string): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
      "i"
    ),
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match) return decode(match[1]);
  }
  return null;
}

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function absolute(value: string | null, base: string): string | null {
  if (!value) return null;
  try {
    return new URL(value, base).toString();
  } catch {
    return null;
  }
}

export async function getLinkPreview(url: string): Promise<LinkPreview | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html" },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 604800 },
    });
    if (!res.ok) return null;

    const html = (await res.text()).slice(0, 400_000);

    const title =
      meta(html, "og:title") ??
      (html.match(/<title[^>]*>([^<]+)/i)?.[1]
        ? decode(html.match(/<title[^>]*>([^<]+)/i)![1])
        : null);
    if (!title) return null;

    const iconHref = html.match(
      /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)/i
    )?.[1];

    return {
      url,
      domain: new URL(url).hostname.replace(/^www\./, ""),
      title,
      description: meta(html, "og:description") ?? meta(html, "description"),
      image: absolute(
        meta(html, "og:image") ?? meta(html, "twitter:image"),
        url
      ),
      favicon: absolute(iconHref ?? "/favicon.ico", url),
    };
  } catch {
    return null;
  }
}
