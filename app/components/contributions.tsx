import { getContributions, monthLabels } from "../../lib/github";

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function formatDay(date: string, count: number) {
  const label = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${count} contribution${count === 1 ? "" : "s"} on ${label}`;
}

export async function Contributions({ login }: { login: string }) {
  const data = await getContributions(login);
  if (!data) return null;

  const labels = monthLabels(data.weeks);

  return (
    <section className="section">
      <div className="sectionHead">
        <p className="sectionLabel">Contributions</p>
        <a
          className="sectionAll"
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noreferrer"
        >
          {data.total.toLocaleString()} this year
        </a>
      </div>

      <div className="ghScroll">
        <div className="ghChart">
          <div className="ghDays" aria-hidden="true">
            {DAY_LABELS.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>

          <div className="ghMonths" aria-hidden="true">
            {labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>

          <div
            className="ghGrid"
            role="img"
            aria-label={`${data.total} GitHub contributions in the last year`}
          >
            {data.weeks.map((week, w) =>
              week.map((day, d) =>
                day.date ? (
                  <span
                    key={`${w}-${d}`}
                    className="ghCell"
                    data-level={day.level}
                    title={formatDay(day.date, day.count)}
                  />
                ) : (
                  <span key={`${w}-${d}`} className="ghCell ghCellEmpty" />
                )
              )
            )}
          </div>
        </div>
      </div>

      <div className="ghLegend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className="ghCell" data-level={level} />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
