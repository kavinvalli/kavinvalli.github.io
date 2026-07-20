import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  draft: boolean;
  content: string;
};

const WRITING_DIR = path.join(process.cwd(), "content/writing");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(WRITING_DIR)) return [];

  const posts = fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file): Post => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(WRITING_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? null,
        draft: data.draft ?? false,
        content,
      };
    })
    .filter((post) => process.env.NODE_ENV === "development" || !post.draft)
    .sort((a, b) => ((a.date ?? "") < (b.date ?? "") ? 1 : -1));

  return posts;
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function formatDate(date: string | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
