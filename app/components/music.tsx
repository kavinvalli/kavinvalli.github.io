import { musicGroups, musicNote, musicPhotos } from "../../lib/music";
import { PhotoStrip } from "./photo-strip";
import * as s from "./styles";

export function Music() {
  return (
    <section className="section">
      <div className={`${s.sectionHead} breakout`}>
        <p className={s.sectionLabel}>Music</p>
        <p className="font-mono text-[0.7rem] lowercase whitespace-nowrap text-faint">
          with{" "}
          {musicGroups.map((group, i) => (
            <span key={group.handle}>
              {i > 0 && " · "}
              <a
                href={group.href}
                target="_blank"
                rel="noreferrer"
                className="text-accent/80 transition-colors hover:text-accent-hover"
              >
                {group.handle}
              </a>
            </span>
          ))}
        </p>
      </div>

      <p className="breakout max-w-[52ch] text-[0.9rem] text-pretty text-muted">
        {musicNote}
      </p>

      {musicPhotos.length > 0 && (
        <div className="breakout mt-4">
          <PhotoStrip images={musicPhotos} label="music" layout="grid" />
        </div>
      )}
    </section>
  );
}
