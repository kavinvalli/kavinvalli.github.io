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

// Two days. Longer would be fine for the metadata itself, but Meta signs its
// avatar URLs with an expiry roughly five days out — refetching well inside
// that window keeps the icon from going dead between deploys.
const PREVIEW_TTL = 172_800;

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

function codePoint(value: number): string {
  // out-of-range or malformed escapes would throw; leave those as they were
  try {
    return String.fromCodePoint(value);
  } catch {
    return "";
  }
}

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    // numeric escapes, decimal and hex — Instagram writes @ as &#064; and the
    // bullet as &#x2022;, and there's no shortlist that covers every site
    .replace(/&#x([0-9a-f]+);/gi, (match, hex) => codePoint(parseInt(hex, 16)) || match)
    .replace(/&#(\d+);/g, (match, dec) => codePoint(Number(dec)) || match)
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

// On a profile page the og:image is the account's avatar, not a cover image:
// Meta serves it at s100x100, so stretching it across the card's 288px-wide
// hero slot is a 3x upscale. It belongs in the icon slot instead, where it
// beats the site's generic favicon — you get the group's logo, not Instagram's.
//
// Those URLs are also signed with an `oe=` expiry a few days out, which is why
// PREVIEW_TTL is shorter than it would otherwise need to be.
const AVATAR_IMAGE_HOSTS = /(^|\.)(cdninstagram\.com|fbcdn\.net)$/i;

function isAvatar(value: string | null): boolean {
  if (!value) return false;
  try {
    return AVATAR_IMAGE_HOSTS.test(new URL(value).hostname);
  } catch {
    return false;
  }
}

export async function getLinkPreview(url: string): Promise<LinkPreview | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html" },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: PREVIEW_TTL },
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

    const ogImage = absolute(
      meta(html, "og:image") ?? meta(html, "twitter:image"),
      url
    );
    const siteIcon = absolute(iconHref ?? "/favicon.ico", url);
    // an avatar is the account's own mark — better in the icon slot than the
    // platform's favicon, and it isn't a cover image so it can't be the hero
    const avatar = isAvatar(ogImage);

    return {
      url,
      domain: new URL(url).hostname.replace(/^www\./, ""),
      title,
      description: meta(html, "og:description") ?? meta(html, "description"),
      image: avatar ? null : ogImage,
      favicon: avatar ? ogImage : siteIcon,
    };
  } catch {
    return null;
  }
}
