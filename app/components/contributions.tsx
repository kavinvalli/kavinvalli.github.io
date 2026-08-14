import type { CSSProperties } from "react";
import { getContributions, monthLabels } from "../../lib/github";
import * as s from "./styles";

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const cell =
  "w-[var(--gh-cell)] h-[var(--gh-cell)] bg-card outline outline-white/5 -outline-offset-1 " +
  "data-[level=1]:bg-accent/28 data-[level=2]:bg-accent/50 " +
  "data-[level=3]:bg-accent/72 data-[level=4]:bg-accent/95";

function formatDay(date: string, count: number) {
  const label = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${count} contribution${count === 1 ? "" : "s"} on ${label}`;
}

// Sits in the default text column rather than the breakout track — a full year
// of columns fits at 9px cells, and it doesn't need the extra width.
export async function Contributions({ login }: { login: string }) {
  const data = await getContributions(login);
  if (!data) return null;

  const labels = monthLabels(data.weeks);

  return (
    <section className="section" data-reveal>
      <div className={s.sectionHead}>
        <p className={s.sectionLabel}>Contributions</p>
        <a
          className={s.sectionAll}
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noreferrer"
        >
          {data.total.toLocaleString()} this year
        </a>
      </div>

      <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid min-w-min grid-cols-[auto_1fr] gap-x-2 gap-y-[0.3rem]">
          <div
            aria-hidden="true"
            className="col-start-1 row-start-2 grid grid-rows-[repeat(7,var(--gh-cell))] gap-[var(--gh-gap)] text-right font-mono text-[0.6rem] leading-[var(--gh-cell)] text-faint"
          >
            {DAY_LABELS.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>

          {/* labels overflow their column rather than stretching the grid */}
          <div
            aria-hidden="true"
            className="col-start-2 row-start-1 grid auto-cols-[var(--gh-cell)] grid-flow-col gap-[var(--gh-gap)] font-mono text-[0.6rem] leading-none text-faint [&>span]:overflow-visible [&>span]:whitespace-nowrap"
          >
            {labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>

          {/* a div per week rather than one flat grid of cells: it renders
              identically, and it gives the fill-in animation something to
              stagger across without an inline delay on all 371 cells */}
          <div
            role="img"
            aria-label={`${data.total} GitHub contributions in the last year`}
            className="col-start-2 row-start-2 grid auto-cols-[var(--gh-cell)] grid-flow-col gap-[var(--gh-gap)]"
            data-reveal
            data-sweep
          >
            {data.weeks.map((week, w) => (
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
                      title={formatDay(day.date, day.count)}
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
        </div>
      </div>

      {/* legend swatches stay small — they're a key, not part of the chart */}
      <div className="mt-3 flex items-center gap-1 font-mono text-[0.6rem] lowercase text-faint">
        <span className="mr-[0.15rem]">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} data-level={level} className={cell} />
        ))}
        <span className="ml-[0.15rem]">More</span>
      </div>
    </section>
  );
}
