import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../../lib/site";
import { getAllPosts } from "../../lib/writing";

// Built once at deploy — posts come off the filesystem, so there's nothing to
// recompute per request.
export const dynamic = "force-static";

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

function escape(value: string) {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

// RSS wants RFC 822. Dates are plain YYYY-MM-DD, which parses as UTC midnight.
function pubDate(date: string) {
  return new Date(date).toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const latest = posts.find((post) => post.date)?.date;

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        // permanent id, independent of the URL ever changing
        `      <guid isPermaLink="false">${url}</guid>`,
        post.date ? `      <pubDate>${pubDate(post.date)}</pubDate>` : "",
        post.description
          ? `      <description>${escape(post.description)}</description>`
          : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_TITLE)}</title>
    <link>${SITE_URL}/writing</link>
    <description>${escape(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${
      latest ? `\n    <lastBuildDate>${pubDate(latest)}</lastBuildDate>` : ""
    }
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
