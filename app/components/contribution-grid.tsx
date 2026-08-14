"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, PointerEvent } from "react";
import type { ContributionDay } from "../../lib/github";

const cell =
  "w-[var(--gh-cell)] h-[var(--gh-cell)] bg-card outline outline-white/5 -outline-offset-1 " +
  "data-[level=1]:bg-accent/28 data-[level=2]:bg-accent/50 " +
  "data-[level=3]:bg-accent/72 data-[level=4]:bg-accent/95";

type Tip = { date: string; count: number; when: string; x: number; y: number };

function formatDay(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    // dates come back as plain YYYY-MM-DD, which parses as UTC midnight — in
    // any negative-offset timezone that formats as the day before
    timeZone: "UTC",
  });
}

// The grid is a client component only for the tooltip. The native `title`
// attribute it replaces took a second to appear and looked like nothing else
// on the site; this one is positioned as `fixed` from the cell's own rect, so
// it escapes the horizontal scroll container that would otherwise clip it.
export function ContributionGrid({
  weeks,
  total,
}: {
  weeks: ContributionDay[][];
  total: number;
}) {
  const [tip, setTip] = useState<Tip | null>(null);

  const track = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-date]"
    );
    // the 2px gaps between cells aren't cells; hold the last day rather than
    // blinking the tooltip out every time the pointer crosses one
    if (!target) return;

    const date = target.dataset.date as string;
    // pointermove fires constantly; only re-render when the day changes
    setTip((current) => {
      if (current?.date === date) return current;
      const rect = target.getBoundingClientRect();
      return {
        date,
        count: Number(target.dataset.count),
        when: formatDay(date),
        // keep it clear of the viewport edges on narrow screens, where the
        // chart scrolls and a cell can sit right against the gutter
        x: Math.min(Math.max(rect.left + rect.width / 2, 100), window.innerWidth - 100),
        // the gap above the cell is applied here, not as a translate — an
        // arbitrary calc() in a class name is easy to get subtly wrong
        y: Math.max(rect.top - 8, 28),
      };
    });
  }, []);

  return (
    <>
      <div
        role="img"
        aria-label={`${total} GitHub contributions in the last year`}
        className="col-start-2 row-start-2 grid auto-cols-[var(--gh-cell)] grid-flow-col gap-[var(--gh-gap)]"
        data-reveal
        data-sweep
        onPointerMove={track}
        onPointerLeave={() => setTip(null)}
      >
        {/* a div per week rather than one flat grid of cells: it renders
            identically, and it gives the fill-in animation something to
            stagger across without an inline delay on all 371 cells */}
        {weeks.map((week, w) => (
          <div
            key={w}
            style={{ "--i": w } as CSSProperties}
            className="grid grid-rows-[repeat(7,var(--gh-cell))] gap-[var(--gh-gap)]"
          >
            {week.map((day, d) =>
              day.date ? (
                <span
                  key={`${w}-${d}`}
                  className={cell}
                  data-level={day.level}
                  data-date={day.date}
                  data-count={day.count}
                />
              ) : (
                <span
                  key={`${w}-${d}`}
                  className="w-[var(--gh-cell)] h-[var(--gh-cell)]"
                />
              )
            )}
          </div>
        ))}
      </div>

      {/* Portalled to <body> so `fixed` resolves against the viewport. Left in
          place it would be a descendant of .page, whose page-in animation
          fills a transform — and a transform anywhere up the tree makes an
          ancestor the containing block, which puts this off-screen once the
          page is scrolled. `tip` is null until a pointer event, so this never
          runs during SSR. */}
      {tip !== null &&
        createPortal(
          <div
            role="tooltip"
            style={{ left: tip.x, top: tip.y }}
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full border border-line bg-card px-[0.5rem] py-[0.2rem] font-mono text-[0.62rem] whitespace-nowrap lowercase text-faint"
          >
            <span className="text-accent">{tip.count}</span>{" "}
            {tip.count === 1 ? "contribution" : "contributions"} · {tip.when}
          </div>,
          document.body
        )}
    </>
  );
}
