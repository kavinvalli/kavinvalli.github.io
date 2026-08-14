import { Contributions } from "./components/contributions";
import { Music } from "./components/music";
import { Now } from "./components/now";
import { PreviewLink } from "./components/preview-link";
import * as s from "./components/styles";
import { socials } from "../lib/socials";

// The contribution fetch revalidates hourly, which makes this page ISR too.
const socialLink =
  "group inline-flex items-center gap-[0.35rem] font-mono text-[0.78rem] lowercase text-muted transition-colors hover:text-foreground";

const arrow =
  "text-faint transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-accent";

// Intro only — writing, mentions, and projects live behind the nav.
// Stats (GitHub activity, now playing) will land below the links.
export default function Home() {
  return (
    <main className="page">
      <h1 className={s.pageTitle}>Kavin Desi Valli</h1>
      <p className={s.tagline}>Waterloo CE &apos;28</p>

      <p className="mt-8 text-[0.95rem] leading-[1.8] text-pretty text-muted">
        I&apos;m a Computer Engineering student at the{" "}
        <PreviewLink href="https://uwaterloo.ca">
          University of Waterloo
        </PreviewLink>{" "}
        and a software engineer, currently at{" "}
        <PreviewLink href="https://tryreplicas.com">
          Replicas
        </PreviewLink>{" "}
        (YC P26). Before that, I worked on the{" "}
        <PreviewLink href="https://v0.app">
          v0
        </PreviewLink>{" "}
        team at{" "}
        <PreviewLink href="https://vercel.com">
          Vercel
        </PreviewLink>
        , built developer tooling at{" "}
        <PreviewLink href="https://helicone.ai">
          Helicone
        </PreviewLink>{" "}
        (YC W23) — LLM observability, multilingual SDKs — and embedded
        full-stack systems at{" "}
        <PreviewLink href="https://www.arcturusnetworks.com">
          Arcturus Networks
        </PreviewLink>
        . I ran{" "}
        <PreviewLink href="https://youtube.com/@livecode247">
          LiveCode247
        </PreviewLink>{" "}
        (200K+ views) and help maintain{" "}
        <PreviewLink href="https://typewind.vercel.app">
          Typewind
        </PreviewLink>
        .
      </p>

      <div
        className="mt-7 flex flex-wrap gap-x-[1.1rem] gap-y-[0.4rem]"
        data-reveal
        data-stagger
      >
        {socials.map((social) => (
          <a
            key={social.medium}
            className={socialLink}
            href={social.link}
            target="_blank"
            rel="noreferrer"
          >
            {social.medium}
            <span className={arrow}>↗</span>
          </a>
        ))}
        <a
          className={socialLink}
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Résumé
          <span className={arrow}>↗</span>
        </a>
      </div>

      <Now />

      <Music />

      <Contributions login="kavinvalli" />

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
      </footer>
    </main>
  );
}
