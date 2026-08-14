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
const card =
  "pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top " +
  "-translate-x-1/2 translate-y-1 scale-[0.98] opacity-0 transition-all duration-150 " +
  "hoverable:group-hover:translate-y-0 hoverable:group-hover:scale-100 " +
  "hoverable:group-hover:opacity-100 " +
  "border border-line bg-background/95 backdrop-blur-sm";

export async function PreviewLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const preview = await getLinkPreview(href);

  const link = (
    <a className={anchor} href={href} target="_blank" rel="noreferrer">
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
                className="size-3 shrink-0 object-contain"
              />
            )}
            {preview.domain}
          </span>
          <span className="mt-1.5 block font-serif text-[0.95rem] leading-snug text-foreground">
            {preview.title}
          </span>
          {/* no `block` on the description — it and line-clamp both set
              display, and block wins */}
          {preview.description && (
            <span className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-muted">
              {preview.description}
            </span>
          )}
        </span>
      </span>
    </span>
  );
}
