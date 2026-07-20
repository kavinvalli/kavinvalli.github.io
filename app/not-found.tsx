import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <main className="page">
      <h1 className="name">404</h1>
      <p className="tagline">This page doesn&apos;t exist.</p>
      <div className="links">
        <Link className="link" href="/">
          Home <span className="arrow">↗</span>
        </Link>
        <Link className="link" href="/writing">
          Writing <span className="arrow">↗</span>
        </Link>
      </div>
    </main>
  );
}
