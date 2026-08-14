import { Contributions } from "./components/contributions";
import { socials } from "../lib/socials";

// Rebuilt at most hourly — the only dynamic thing here is the contribution
// graph, and it's fed by an hourly-revalidated fetch.
export const revalidate = 3600;

// Intro only — writing, mentions, and projects live behind the nav.
// Stats (GitHub activity, now playing) will land below the links.
export default function Home() {
  return (
    <main className="page">
      <h1 className="name">Kavin Desi Valli</h1>
      <p className="tagline">Waterloo CE &apos;28</p>

      <p className="about">
        I&apos;m a Computer Engineering student at the{" "}
        <a href="https://uwaterloo.ca" target="_blank" rel="noreferrer">
          University of Waterloo
        </a>{" "}
        and a software engineer, currently at{" "}
        <a href="https://tryreplicas.com" target="_blank" rel="noreferrer">
          Replicas
        </a>{" "}
        (YC P26). Before that, I worked on the{" "}
        <a href="https://v0.app" target="_blank" rel="noreferrer">
          v0
        </a>{" "}
        team at{" "}
        <a href="https://vercel.com" target="_blank" rel="noreferrer">
          Vercel
        </a>
        , built developer tooling at{" "}
        <a href="https://helicone.ai" target="_blank" rel="noreferrer">
          Helicone
        </a>{" "}
        (YC W23) — LLM observability, multilingual SDKs —
        and embedded full-stack systems at{" "}
        <a
          href="https://www.arcturusnetworks.com"
          target="_blank"
          rel="noreferrer"
        >
          Arcturus Networks
        </a>
        . I ran{" "}
        <a
          href="https://youtube.com/@livecode247"
          target="_blank"
          rel="noreferrer"
        >
          LiveCode247
        </a>{" "}
        (200K+ views) and help maintain{" "}
        <a href="https://typewind.vercel.app" target="_blank" rel="noreferrer">
          Typewind
        </a>
        .
      </p>

      <div className="links">
        {socials.map((s) => (
          <a
            key={s.medium}
            className="link"
            href={s.link}
            target="_blank"
            rel="noreferrer"
          >
            {s.medium}
            <span className="arrow">↗</span>
          </a>
        ))}
        <a className="link" href="/resume.pdf" target="_blank" rel="noreferrer">
          Résumé
          <span className="arrow">↗</span>
        </a>
      </div>

      <Contributions login="kavinvalli" />

      <footer className="footer">
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
      </footer>
    </main>
  );
}
