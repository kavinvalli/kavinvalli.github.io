import type { Metadata } from "next";
import Link from "next/link";
import { MentionRow } from "../components/rows";
import * as s from "../components/styles";
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
      <h1 className={s.pageTitle}>Writing</h1>
      <p className={s.tagline}>
        Essays, notes, and things I&apos;m figuring out.
      </p>

      <section className="section">
        {posts.length === 0 ? (
          <p className={s.rowDesc}>Nothing here yet — check back soon.</p>
        ) : (
          <div className={`${s.rowGrid} breakout`}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                className={s.row}
                href={`/writing/${post.slug}`}
              >
                <div className={s.rowHead}>
                  <span className={s.rowTitle}>{post.title}</span>
                  <span className={s.rowMeta}>{formatDate(post.date)}</span>
                </div>
                {post.description && (
                  <p className={s.rowDesc}>{post.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {mentions.length > 0 && (
        <section className="section">
          <div className={s.sectionHead}>
            <p className={s.sectionLabel}>Elsewhere</p>
          </div>
          <div className={`${s.rowGrid} breakout`}>
            {mentions.map((mention) => (
              <MentionRow key={mention.link} mention={mention} />
            ))}
          </div>
        </section>
      )}

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
        <Link href="/">kavin.me</Link>
      </footer>
    </main>
  );
}
