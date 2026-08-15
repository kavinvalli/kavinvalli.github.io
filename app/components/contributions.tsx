import { getContributions, monthLabels } from "../../lib/github";
import { ContributionGrid } from "./contribution-grid";
import * as s from "./styles";

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

// the legend reuses the cell styling; the chart's own copy lives with the grid
const cell =
  "w-[var(--gh-cell)] h-[var(--gh-cell)] bg-card outline outline-white/5 -outline-offset-1 " +
  "data-[level=1]:bg-accent/28 data-[level=2]:bg-accent/50 " +
  "data-[level=3]:bg-accent/72 data-[level=4]:bg-accent/95";

// Sits in the default text column rather than the breakout track — a full year
// of columns fits at 9px cells, and it doesn't need the extra width.
export async function Contributions({ login }: { login: string }) {
  const data = await getContributions(login);
  if (!data) return null;

  const labels = monthLabels(data.weeks);

  return (
    <section className="section" data-reveal>
      <div className="flex flex-col gap-0 mb-4">
        <div className={s.sectionHead}>
          <p className="mb-0 flex items-baseline justify-between gap-4">
            Contributions
          </p>
          <a
            className={s.sectionAll}
            href={`https://github.com/${login}`}
            target="_blank"
            rel="noreferrer"
          >
            {data.total.toLocaleString()} this year
          </a>
        </div>
        <p className="font-mono text-[0.7rem] lowercase text-faint">
          am i really a dev if i don't put up my github contribution chart?
        </p>
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

          <ContributionGrid weeks={data.weeks} total={data.total} />
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
