import type { Metadata } from "next";
import Link from "next/link";
import { Experience } from "../components/experience";
import * as s from "../components/styles";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Where Kavin Desi Valli has worked — Replicas, Vercel, Helicone, and Arcturus Networks.",
};

export default function WorkIndex() {
  return (
    <main className="page">
      <h1 className={s.pageTitle}>Work</h1>
      <p className={s.tagline}>Places I&apos;ve worked, and what I shipped.</p>

      <Experience />

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
        <Link href="/">kavin.me</Link>
      </footer>
    </main>
  );
}
