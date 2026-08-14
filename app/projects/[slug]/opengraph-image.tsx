import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgCard,
  ogFonts,
} from "../../components/og-card";
import { getAllProjectPages, getProjectPage } from "../../../lib/project-pages";
import { projects } from "../../../lib/projects";

export const alt = "A project by Kavin Desi Valli";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllProjectPages().map((page) => ({ slug: page.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getProjectPage(slug);
  const project = projects.find((entry) => entry.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow="kavin.me/projects"
        title={page?.title ?? "Projects"}
        // the stack reads better at this size than the full description, and
        // lowercased to match how the tags render on the site
        meta={project?.stack.join(" · ").toLowerCase()}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}
