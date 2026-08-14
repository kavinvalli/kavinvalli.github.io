// Shared row markup so the homepage previews and the dedicated index pages
// stay identical — change a row here, both places follow.
import type { Mention } from "../../lib/mentions";
import type { Project } from "../../lib/projects";
import { formatDate } from "../../lib/writing";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <a className="row" href={project.link} target="_blank" rel="noreferrer">
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
  );
}

export function MentionRow({ mention }: { mention: Mention }) {
  return (
    <a className="row" href={mention.link} target="_blank" rel="noreferrer">
      <div className="rowHead">
        <span className="rowTitle">{mention.title}</span>
        <span className="rowMeta">{formatDate(mention.date)}</span>
      </div>
      <p className="rowDesc">{mention.note}</p>
      {mention.quote && <p className="rowQuote">&ldquo;{mention.quote}&rdquo;</p>}
      <div className="tags">
        <span className="tag">{mention.publisher}</span>
      </div>
    </a>
  );
}
