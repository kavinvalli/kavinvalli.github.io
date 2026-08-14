import { Contributions } from "./components/contributions";
import * as s from "./components/styles";
import { socials } from "../lib/socials";

// Rebuilt at most hourly — the only dynamic thing here is the contribution
// graph, and it's fed by an hourly-revalidated fetch.
export const revalidate = 3600;

const proseLink =
  "border-b border-line-strong pb-px text-foreground transition-colors hover:border-accent hover:text-accent-hover";

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
        <a
          className={proseLink}
          href="https://uwaterloo.ca"
          target="_blank"
          rel="noreferrer"
        >
          University of Waterloo
        </a>{" "}
        and a software engineer, currently at{" "}
        <a
          className={proseLink}
          href="https://tryreplicas.com"
          target="_blank"
          rel="noreferrer"
        >
          Replicas
        </a>{" "}
        (YC P26). Before that, I worked on the{" "}
        <a
          className={proseLink}
          href="https://v0.app"
          target="_blank"
          rel="noreferrer"
        >
          v0
        </a>{" "}
        team at{" "}
        <a
          className={proseLink}
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
        >
          Vercel
        </a>
        , built developer tooling at{" "}
        <a
          className={proseLink}
          href="https://helicone.ai"
          target="_blank"
          rel="noreferrer"
        >
          Helicone
        </a>{" "}
        (YC W23) — LLM observability, multilingual SDKs — and embedded
        full-stack systems at{" "}
        <a
          className={proseLink}
          href="https://www.arcturusnetworks.com"
          target="_blank"
          rel="noreferrer"
        >
          Arcturus Networks
        </a>
        . I ran{" "}
        <a
          className={proseLink}
          href="https://youtube.com/@livecode247"
          target="_blank"
          rel="noreferrer"
        >
          LiveCode247
        </a>{" "}
        (200K+ views) and help maintain{" "}
        <a
          className={proseLink}
          href="https://typewind.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          Typewind
        </a>
        .
      </p>

      <div className="mt-7 flex flex-wrap gap-x-[1.1rem] gap-y-[0.4rem]">
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

      <Contributions login="kavinvalli" />

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
      </footer>
    </main>
  );
}
