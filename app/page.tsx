import Link from "next/link";
import { projects } from "../lib/projects";
import { socials } from "../lib/socials";
import { getAllPosts, formatDate } from "../lib/writing";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);

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

      {posts.length > 0 && (
        <section className="section">
          <p className="sectionLabel">Writing</p>
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="row"
              href={`/writing/${post.slug}`}
            >
              <div className="rowHead">
                <span className="rowTitle">{post.title}</span>
                <span className="rowMeta">{formatDate(post.date)}</span>
              </div>
              {post.description && <p className="rowDesc">{post.description}</p>}
            </Link>
          ))}
        </section>
      )}

      <section className="section">
        <p className="sectionLabel">Projects</p>
        {projects.map((project) => (
          <a
            key={project.name}
            className="row"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <div className="rowHead">
              <span className="rowTitle">{project.name}</span>
              <span className="rowMeta">↗</span>
            </div>
            <p className="rowDesc">{project.description}</p>
            <div className="tags">
              {project.stack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
        <span>Built with Next.js</span>
      </footer>
    </main>
  );
}
