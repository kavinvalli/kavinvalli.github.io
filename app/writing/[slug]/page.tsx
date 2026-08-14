import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkSmartypants from "remark-smartypants";
import * as s from "../../components/styles";
import { getAllPosts, getPost, formatDate } from "../../../lib/writing";

type Params = { slug: string };

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkSmartypants],
  },
};

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="page">
      <header className="mb-10">
        <h1 className="font-serif text-[clamp(2rem,5.5vw,2.8rem)] font-normal leading-[1.08] tracking-[-0.02em] text-balance">
          {post.title}
        </h1>
        {post.date && (
          <p className="mt-3 font-mono text-[0.72rem] lowercase tabular-nums text-faint">
            {formatDate(post.date)}
          </p>
        )}
      </header>

      <article className="prose">
        <MDXRemote source={post.content} options={mdxOptions} />
      </article>

      <footer className={s.footer}>
        <Link href="/writing">← All writing</Link>
        <Link href="/">kavin.me</Link>
      </footer>
    </main>
  );
}
