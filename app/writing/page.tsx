import type { Metadata } from "next";
import Link from "next/link";
import { MentionRow } from "../components/rows";
import { mentions } from "../../lib/mentions";
import { getAllPosts, formatDate } from "../../lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes by Kavin Desi Valli, and where his work has been written about.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <main className="page">
      <h1 className="name">Writing</h1>
      <p className="tagline">Essays, notes, and things I&apos;m figuring out.</p>

      <section className="section">
        {posts.length === 0 && (
          <p className="rowDesc">Nothing here yet — check back soon.</p>
        )}
        {posts.map((post) => (
          <Link key={post.slug} className="row" href={`/writing/${post.slug}`}>
            <div className="rowHead">
              <span className="rowTitle">{post.title}</span>
              <span className="rowMeta">{formatDate(post.date)}</span>
            </div>
            {post.description && <p className="rowDesc">{post.description}</p>}
          </Link>
        ))}
      </section>

      {mentions.length > 0 && (
        <section className="section">
          <p className="sectionLabel">Elsewhere</p>
          {mentions.map((mention) => (
            <MentionRow key={mention.link} mention={mention} />
          ))}
        </section>
      )}

      <footer className="footer">
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
        <Link href="/">kavin.me</Link>
      </footer>
    </main>
  );
}
