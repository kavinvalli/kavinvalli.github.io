import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgCard,
  ogFonts,
} from "../../components/og-card";
import { formatDate, getAllPosts, getPost } from "../../../lib/writing";

// A card per post, so sharing one shows its own title instead of the generic
// site card. `alt` has to be a static export, hence the general wording.
export const alt = "A post by Kavin Desi Valli";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow="kavin.me/writing"
        title={post?.title ?? "Writing"}
        meta={post?.date ? formatDate(post.date).toLowerCase() : undefined}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}
