import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

// Link previews — WhatsApp, Slack, iMessage, Twitter. Generated at build so it
// stays in sync with the site's type and palette instead of being a stale PNG.
export const alt = "Kavin Desi Valli — software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const serif = fs.readFileSync(
    path.join(process.cwd(), "app/fonts/InstrumentSerif-Regular.ttf")
  );

  return new ImageResponse(
    (
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
            textTransform: "lowercase",
            color: "#d98a4f",
            marginBottom: 28,
          }}
        >
          kavin.me
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: 116,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#ededed",
          }}
        >
          kavin desi valli
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 32,
            lineHeight: 1.4,
            color: "#a1a1a1",
            marginTop: 26,
            maxWidth: 900,
          }}
        >
          software engineer at Replicas. previously v0 at Vercel, and Helicone.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            height: 3,
            width: 180,
            background: "#d98a4f",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }],
    }
  );
}
