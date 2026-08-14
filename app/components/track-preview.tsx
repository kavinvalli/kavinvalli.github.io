"use client";

import { useRef, useState } from "react";
import type { Track } from "../../lib/soundtrack";

// Click, not hover. Browsers refuse to start audio before the visitor has
// interacted with the page, and hovering doesn't count — a hover-to-play
// version would silently do nothing on the first film anyone points at, which
// is the only one that matters. Ambushing people with sound is also rude.
export function TrackPreview({ track }: { track: Track }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      return;
    }

    // play() rejects if the browser blocks it; don't leave the UI claiming to
    // be playing when nothing is
    audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false)
    );
  };

  return (
    // sits inline on the entry's label row, so it adds no height of its own.
    // The track name goes ahead of the button, which keeps the control
    // anchored at the right edge however long the title runs.
    <span className="inline-flex min-w-0 items-baseline gap-2 font-mono text-[0.62rem] lowercase">
      {playing && (
        <span className="min-w-0 truncate text-faint">
          {track.link ? (
            <a
              href={track.link}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent-hover"
            >
              {track.name}
            </a>
          ) : (
            track.name
          )}
        </span>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={
          playing
            ? `Stop ${track.name} by ${track.artist}`
            : `Play a preview of ${track.name} by ${track.artist}`
        }
        className="shrink-0 whitespace-nowrap text-accent/70 transition-colors hover:text-accent-hover"
      >
        {playing ? "■" : "▶ theme"}
      </button>

      {/* preload="none" — 30s of audio shouldn't be fetched by every visitor
          who never clicks */}
      <audio
        ref={audioRef}
        src={track.previewUrl}
        preload="none"
        onEnded={() => setPlaying(false)}
      />
    </span>
  );
}
