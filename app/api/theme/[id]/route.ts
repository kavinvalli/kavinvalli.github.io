// Deezer signs its preview URLs with an `exp` roughly twelve minutes out, so
// one baked into a build is dead long before anyone clicks. The page carries
// the track id instead — stable forever — and this resolves a fresh URL at
// play time and redirects the <audio> element to it.

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return new Response("Bad track id", { status: 400 });
  }

  try {
    const res = await fetch(`https://api.deezer.com/track/${id}`, {
      // a cached response here would defeat the point — the URL inside it is
      // what expires
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return new Response("Upstream error", { status: 502 });

    const preview: unknown = (await res.json())?.preview;
    if (typeof preview !== "string" || !preview) {
      return new Response("No preview for this track", { status: 404 });
    }

    return new Response(null, {
      status: 302,
      headers: { Location: preview, "Cache-Control": "no-store" },
    });
  } catch {
    return new Response("Lookup failed", { status: 502 });
  }
}
