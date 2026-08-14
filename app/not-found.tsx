import type { Metadata } from "next";
import Link from "next/link";
import * as s from "./components/styles";

export const metadata: Metadata = {
  title: "Not found",
};

const link =
  "group inline-flex items-center gap-[0.35rem] font-mono text-[0.78rem] lowercase text-muted transition-colors hover:text-foreground";

const arrow =
  "text-faint transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-accent";

export default function NotFound() {
  return (
    <main className="page">
      <h1 className={s.pageTitle}>404</h1>
      <p className={s.tagline}>This page doesn&apos;t exist.</p>
      <div className="mt-7 flex flex-wrap gap-x-[1.1rem] gap-y-[0.4rem]">
        <Link className={link} href="/">
          Home <span className={arrow}>↗</span>
        </Link>
        <Link className={link} href="/writing">
          Writing <span className={arrow}>↗</span>
        </Link>
      </div>
    </main>
  );
}
