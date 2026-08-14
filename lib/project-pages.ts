import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Long-form writeups for projects that have one. Mirrors lib/writing.ts —
// a project in lib/projects.ts opts in by setting `slug` to a file here.
export type ProjectPage = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getAllProjectPages(): ProjectPage[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file): ProjectPage => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        content,
      };
    });
}

export function getProjectPage(slug: string): ProjectPage | null {
  return getAllProjectPages().find((page) => page.slug === slug) ?? null;
}
