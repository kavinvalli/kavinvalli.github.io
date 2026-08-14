// Shared row markup so the homepage previews and the dedicated index pages
// stay identical — change a row here, both places follow.
import Link from "next/link";
import type { Mention } from "../../lib/mentions";
import type { Project } from "../../lib/projects";
import { formatDate } from "../../lib/writing";
import * as s from "./styles";

export function ProjectRow({ project }: { project: Project }) {
  // a writeup wins over an outbound link; arrows say which you're getting
  const body = (
    <>
      <div className={s.rowHead}>
        <span className={s.rowTitle}>{project.name}</span>
        <span className={s.rowMeta}>{project.slug ? "→" : "↗"}</span>
      </div>
      <p className={s.rowDesc}>{project.description}</p>
      <div className={s.tags}>
        {project.stack.map((tech) => (
          <span key={tech} className={s.tag}>
            {tech}
          </span>
        ))}
      </div>
    </>
  );

  if (project.slug) {
    return (
      <Link className={s.row} href={`/projects/${project.slug}`}>
        {body}
      </Link>
    );
  }

  if (!project.link) return <div className={s.row}>{body}</div>;

  return (
    <a className={s.row} href={project.link} target="_blank" rel="noreferrer">
      {body}
    </a>
  );
}

export function MentionRow({ mention }: { mention: Mention }) {
  return (
    <a
      className={s.row}
      href={mention.link}
      target="_blank"
      rel="noreferrer"
    >
      <div className={s.rowHead}>
        <span className={s.rowTitle}>{mention.title}</span>
        <span className={s.rowMeta}>{formatDate(mention.date)}</span>
      </div>
      <p className={s.rowDesc}>{mention.note}</p>
      {mention.quote && <p className={s.rowQuote}>&ldquo;{mention.quote}&rdquo;</p>}
      <div className={s.tags}>
        <span className={s.tag}>{mention.publisher}</span>
      </div>
    </a>
  );
}
