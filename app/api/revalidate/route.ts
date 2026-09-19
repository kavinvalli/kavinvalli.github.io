// Purges a cached upstream fetch on demand, so a film logged a minute ago shows
// up without waiting out its six-hour window. Set REVALIDATE_SECRET in
// .env.local and in the Vercel project settings — without it the route is off
// entirely rather than open.
//
//   curl -X POST "https://kavin.me/api/revalidate?tag=letterboxd-film" \
//     -H "Authorization: Bearer $REVALIDATE_SECRET"
//
// GET works the same way and takes `?secret=`, which is the bookmarkable form
// for a phone. Omit `tag` to purge everything in TAGS.

import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTRIBUTIONS_TAG } from "../../../lib/github";
import { FILM_TAG } from "../../../lib/letterboxd";

export const dynamic = "force-dynamic";

const TAGS = [FILM_TAG, CONTRIBUTIONS_TAG];

function offeredSecret(request: Request, url: URL): string {
  const header = request.headers.get("authorization");
  if (header) return header.replace(/^Bearer\s+/i, "");
  return url.searchParams.get("secret") ?? "";
}

function matches(offered: string, secret: string): boolean {
  const a = Buffer.from(offered);
  const b = Buffer.from(secret);
  // timingSafeEqual throws on a length mismatch, so that has to be checked
  // first — it leaks the secret's length, which isn't the part worth hiding.
  return a.length === b.length && timingSafeEqual(a, b);
}

async function purge(request: Request): Promise<Response> {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { error: "REVALIDATE_SECRET is not set" },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  if (!matches(offeredSecret(request, url), secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requested = url.searchParams.get("tag");
  if (requested && !TAGS.includes(requested)) {
    return Response.json(
      { error: `Unknown tag "${requested}"`, known: TAGS },
      { status: 400 }
    );
  }

  const purged = requested ? [requested] : TAGS;
  // Next 16 wants a cache-life profile alongside the tag; "max" marks the entry
  // stale without forbidding a stale serve while it refetches in the
  // background, so the very next load may still be the old one.
  for (const tag of purged) revalidateTag(tag, "max");

  return Response.json({ purged });
}

export const GET = purge;
export const POST = purge;
