"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Photos are duotoned toward the accent in the strip — greyscale underneath,
// an amber wash on top in `color` blend mode — and open full-colour in a
// native <dialog>, which brings Esc-to-close and focus trapping with it.
export function PhotoStrip({
  images,
  company,
}: {
  images: string[];
  company: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null
          ? current
          : (current + delta + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <>
      <div
        className="mt-4 -mb-1 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label={`Photos from ${company}`}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => open(i)}
            aria-label={`Open photo ${i + 1} of ${images.length} from ${company}`}
            className={`group/photo relative block h-36 w-52 shrink-0 cursor-zoom-in snap-start overflow-hidden bg-card ${
              loaded[src] ? "" : "animate-pulse"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="208px"
              onLoad={() => setLoaded((prev) => ({ ...prev, [src]: true }))}
              className="object-cover grayscale contrast-110 transition duration-300 hoverable:group-hover/photo:grayscale-0"
            />
            <span className="absolute inset-0 bg-accent/45 mix-blend-color transition-opacity duration-300 hoverable:group-hover/photo:opacity-0" />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        // clicking the backdrop lands on the dialog itself, not its contents
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        // preflight resets margin, so the browser's default `margin: auto`
        // centring for <dialog> is gone — size it to the viewport and centre
        // the contents instead
        className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/60 backdrop:backdrop-blur-[2px]"
      >
        {index !== null && (
          // anything that isn't the photo or a control closes; the photo and
          // the buttons stop the click from reaching here
          <div
            onClick={close}
            className="flex size-full flex-col items-center justify-center gap-3"
          >
            {/* every photo gets the same frame as the strip, so stepping
                through a set doesn't resize the viewer under the cursor */}
            <div className="relative aspect-[13/9] max-h-[78vh] w-[min(88vw,900px)]">
              <Image
                src={images[index]}
                alt={`${company}, photo ${index + 1} of ${images.length}`}
                fill
                priority
                sizes="(max-width: 900px) 88vw, 900px"
                onClick={(event) => event.stopPropagation()}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-4 font-mono text-[0.68rem] lowercase text-faint">
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(-1);
                    }}
                    className="transition-colors hover:text-accent-hover"
                  >
                    ← prev
                  </button>
                  <span className="tabular-nums text-accent/80">
                    {index + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(1);
                    }}
                    className="transition-colors hover:text-accent-hover"
                  >
                    next →
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={close}
                className="transition-colors hover:text-accent-hover"
              >
                esc to close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
