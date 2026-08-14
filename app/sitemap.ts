import type { MetadataRoute } from "next";
import { getAllProjectPages } from "../lib/project-pages";
import { SITE_URL } from "../lib/site";
import { getAllPosts } from "../lib/writing";

// Prerendered to /sitemap.xml at build. /api and /s (the shortlink redirector)
// are left out deliberately — they're plumbing, not pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const projectPages = getAllProjectPages();

  // posts arrive newest-first, so the first dated one is the site's last update
  const latest = posts.find((post) => post.date)?.date ?? undefined;

  return [
    { url: SITE_URL, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/writing`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },

    ...posts.map((post) => ({
      url: `${SITE_URL}/writing/${post.slug}`,
      lastModified: post.date ?? undefined,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    ...projectPages.map((page) => ({
      url: `${SITE_URL}/projects/${page.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
