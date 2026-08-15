/* eslint-disable @next/next/no-img-element */
import { getLinkPreview } from "../../lib/preview";

// Hover cards are pure CSS — no client JS. The `hoverable:` variant (defined in
// globals.css) gates them behind @media (hover: hover); Tailwind does that for
// `hover:` but not for `group-hover:`, and without it a tap on a touch device
// leaves the card stuck open.

// Amber underlines put the accent into the intro, which is otherwise
// colourless until you hover something.
const anchor =
  "border-b border-accent/40 pb-px text-foreground transition-colors hover:border-accent hover:text-accent-hover";

// Anchored below the link and centred on it: the intro sits near the top of the
// page, so a card above would run off-screen under the sticky nav, and centring
// halves how far it can overhang either edge of the text column.
// `hidden hoverable:block` rather than opacity alone: opacity-0 still occupies
// layout, and a 288px card centred on a link near the right edge hangs past the
// text column and gives the page horizontal overflow. On touch the card can
// never be shown anyway, so it shouldn't be in the layout to begin with.
const card =
  // whitespace-normal/normal-case/font-sans reset what the card would
  // otherwise inherit from whatever it sits inside — the music credit line is
  // mono, lowercase and nowrap, and nowrap in particular runs the card's text
  // straight out of a fixed-width box.
  "hidden hoverable:block pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top " +
  "whitespace-normal normal-case font-sans " +
  "-translate-x-1/2 translate-y-1 scale-[0.98] opacity-0 transition-all duration-150 " +
  "hoverable:group-hover:translate-y-0 hoverable:group-hover:scale-100 " +
  "hoverable:group-hover:opacity-100 " +
  // Lighter fill than it looks like it needs, with the blur carrying the
  // legibility instead. The glow now sits right behind the intro, and a
  // near-opaque panel over a lit background reads as a slab rather than glass.
  "border border-line bg-background/85 backdrop-blur-md";

export async function PreviewLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  // callers outside the intro paragraph keep their own link styling; the
  // amber-underline treatment is only right at body size
  className?: string;
}) {
  const preview = await getLinkPreview(href);

  const link = (
    <a
      className={className ?? anchor}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );

  if (!preview) return link;

  return (
    <span className="group relative inline-block">
      {link}
      <span className={card} aria-hidden="true">
        {preview.image && (
          <img
            src={preview.image}
            alt=""
            loading="lazy"
            className="block aspect-[1.91/1] w-full border-b border-line object-cover"
          />
        )}
        <span className="block p-3">
          <span className="flex items-center gap-1.5 font-mono text-[0.65rem] lowercase text-faint">
            {preview.favicon && (
              <img
                src={preview.favicon}
                alt=""
                loading="lazy"
                className="size-4 shrink-0 object-contain"
              />
            )}
            {preview.domain}
          </span>
          <span className="mt-1.5 block font-serif text-[0.95rem] leading-snug text-foreground">
            {preview.title}
          </span>
        </span>
      </span>
    </span>
  );
}
