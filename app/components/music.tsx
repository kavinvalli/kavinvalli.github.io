import { musicGroups, musicNote, musicPhotos } from "../../lib/music";
import { PhotoStrip } from "./photo-strip";
import { PreviewLink } from "./preview-link";
import * as s from "./styles";

export function Music() {
  return (
    <section className="section" data-reveal>
      <div className="breakout mb-4 flex flex-col gap-1">
        {/* sectionHead's own mb-4 would sit under the note as well, so the
            heading row is composed without it and the gap does the spacing */}
        <div className="flex items-baseline justify-between gap-4">
          <p className={s.sectionLabel}>Music</p>
          <p className="font-mono text-[0.7rem] lowercase whitespace-nowrap text-faint">
            with{" "}
            {musicGroups.map((group, i) => (
              <span key={group.handle}>
                {i > 0 && " · "}
                <PreviewLink
                  href={group.href}
                  className="text-accent/80 transition-colors hover:text-accent-hover"
                >
                  {group.handle}
                </PreviewLink>
              </span>
            ))}
          </p>
        </div>

        {/* same aside treatment as the contributions heading */}
        <p className="font-mono text-[0.7rem] lowercase text-pretty text-faint">
          {musicNote}
        </p>
      </div>

      {musicPhotos.length > 0 && (
        <div className="breakout mt-4">
          <PhotoStrip images={musicPhotos} label="music" layout="grid" />
        </div>
      )}
    </section>
  );
}
