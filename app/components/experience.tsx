import { experience } from "../../lib/experience";
import { PhotoStrip } from "./photo-strip";
import * as s from "./styles";

export function Experience() {
  if (experience.length === 0) return null;

  return (
    <section className="section">
      <div className={`${s.sectionHead} breakout`}>
        <p className={s.sectionLabel}>Experience</p>
      </div>

      {/* the rail: a dashed line down the left, with a marker per role */}
      <ol className="breakout border-l border-dashed border-line">
        {experience.map((job) => (
          <li
            key={job.company}
            className="relative py-5 pl-6 first:pt-0 last:pb-0"
          >
            {/* the marker hangs off the title row, not the <li> — items have
                different top padding, so any fixed offset misaligns */}
            <div className={`relative ${s.rowHead}`}>
              <span
                aria-hidden="true"
                className="absolute top-1/2 -left-[calc(1.5rem+2.5px)] size-[5px] -translate-y-1/2 rounded-full bg-accent"
              />
              <span className={s.rowTitle}>
                {job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent-hover"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </span>
              {job.period && <span className={s.rowMeta}>{job.period}</span>}
            </div>

            <p className="mt-0.5 font-mono text-[0.62rem] lowercase text-accent/70">
              {job.role}
            </p>
            <p className={s.rowDesc}>{job.description}</p>

            {job.images && job.images.length > 0 && (
              <PhotoStrip images={job.images} label={job.company} />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
