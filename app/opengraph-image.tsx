import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from "./components/og-card";
import { SITE_DESCRIPTION } from "../lib/site";

// Link previews — WhatsApp, Slack, iMessage, Twitter. Generated at build so it
// stays in sync with the site's type and palette instead of being a stale PNG.
export const alt = "Kavin Desi Valli — software engineer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="kavin.me"
        title="kavin desi valli"
        meta={SITE_DESCRIPTION.toLowerCase()}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}
