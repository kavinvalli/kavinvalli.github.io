import fs from "fs";
import path from "path";

// Shared layout for every link preview on the site. Rendered by next/og's
// ImageResponse, which runs satori — a small subset of CSS, no stylesheet, and
// no access to next/font's cache. Hence the vendored face and inline styles.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const ACCENT = "#d98a4f";

export function ogFonts() {
  const serif = fs.readFileSync(
    path.join(process.cwd(), "app/fonts/InstrumentSerif-Regular.ttf")
  );
  return [
    { name: "Instrument Serif", data: serif, style: "normal" as const, weight: 400 as const },
  ];
}

// Long titles have to fit in a fixed frame, and the card is bottom-aligned, so
// an oversized one grows up off the top edge rather than wrapping politely.
function titleSize(title: string) {
  if (title.length <= 20) return 112;
  if (title.length <= 34) return 88;
  if (title.length <= 55) return 72;
  return 58;
}

export function OgCard({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#000000",
        // the same amber wash that sits behind the top of the site
        backgroundImage:
          "radial-gradient(60% 55% at 50% -8%, rgba(217,138,79,0.28), transparent 70%)",
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: "0.08em",
          color: ACCENT,
          marginBottom: 28,
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Instrument Serif",
          fontSize: titleSize(title),
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: "#ededed",
        }}
      >
        {title}
      </div>

      {meta ? (
        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.4,
            color: "#a1a1a1",
            marginTop: 26,
            maxWidth: 900,
          }}
        >
          {meta}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          marginTop: 44,
          height: 3,
          width: 180,
          background: ACCENT,
        }}
      />
    </div>
  );
}
