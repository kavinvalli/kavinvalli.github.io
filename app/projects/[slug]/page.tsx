import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkSmartypants from "remark-smartypants";
import * as s from "../../components/styles";
import { getAllProjectPages, getProjectPage } from "../../../lib/project-pages";
import { projects } from "../../../lib/projects";

type Params = { slug: string };

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkSmartypants],
  },
};

export function generateStaticParams(): Params[] {
  return getAllProjectPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getProjectPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getProjectPage(slug);
  if (!page) notFound();

  const project = projects.find((entry) => entry.slug === slug);

  return (
    <main className="page">
      <header className="mb-10">
        <h1 className="font-serif text-[clamp(2rem,5.5vw,2.8rem)] font-normal leading-[1.08] tracking-[-0.02em] text-balance">
          {page.title}
        </h1>
        {project && (
          <div className={s.tags}>
            {project.stack.map((tech) => (
              <span key={tech} className={s.tag}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </header>

      <article className="prose">
        <MDXRemote source={page.content} options={mdxOptions} />
      </article>

      <footer className={s.footer}>
        <Link href="/projects">← all projects</Link>
        <Link href="/">kavin.me</Link>
      </footer>
    </main>
  );
}
