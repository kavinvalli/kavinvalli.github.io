import type { Metadata } from "next";
import Link from "next/link";
import { ProjectRow } from "../components/rows";
import { projects } from "../../lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Kavin Desi Valli has built.",
};

export default function ProjectsIndex() {
  return (
    <main className="page">
      <h1 className="name">Projects</h1>
      <p className="tagline">Things I&apos;ve built, shipped, and maintained.</p>

      <section className="section">
        <div className="rowGrid breakout">
          {projects.map((project) => (
            <ProjectRow key={project.name} project={project} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Kavin Desi Valli</span>
        <Link href="/">kavin.me</Link>
      </footer>
    </main>
  );
}
