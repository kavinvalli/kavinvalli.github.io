// Class strings shared across pages. Utilities live inline everywhere they're
// used once; these are the patterns repeated across files, kept in one place so
// a row on /writing can't drift from a row on /projects.

export const pageTitle =
  "font-serif text-[clamp(2.4rem,7vw,3.4rem)] font-normal leading-[1.02] tracking-[-0.02em] lowercase text-balance text-foreground";

export const tagline = "mt-2 font-mono text-[0.78rem] lowercase text-faint";

export const sectionHead = "mb-4 flex items-baseline justify-between gap-4";

export const sectionLabel =
  "font-serif text-[1.9rem] font-normal leading-[1.1] tracking-[-0.01em] lowercase text-foreground";

export const sectionAll =
  "font-mono text-[0.7rem] lowercase whitespace-nowrap text-accent/80 transition-colors hover:text-accent-hover group";

// Dashed cell dividers: top/left on the container, bottom/right on each cell,
// so interior rules never double up.
export const rowGrid =
  "grid grid-cols-1 border-t border-l border-dashed border-line sm:grid-cols-2";

export const row =
  "block border-r border-b border-dashed border-line px-[1.35rem] py-[1.15rem] transition-colors hover:bg-card";

export const rowHead = "flex items-baseline justify-between gap-4";

export const rowTitle =
  "min-w-0 font-serif text-[1.2rem] font-normal leading-[1.25] tracking-[-0.01em] text-balance text-foreground";

export const rowMeta =
  "shrink-0 font-mono text-[0.7rem] lowercase tabular-nums text-faint";

export const rowDesc = "mt-[0.45rem] text-[0.85rem] leading-relaxed text-muted";

export const rowQuote =
  "mt-[0.6rem] border-l border-accent pl-[0.8rem] text-[0.85rem] italic text-pretty text-foreground";

export const tags = "mt-3 flex flex-wrap gap-[0.65rem]";

export const tag = "font-mono text-[0.68rem] lowercase text-accent/55";

export const footer =
  "mt-18 flex flex-wrap justify-between gap-4 border-t border-dashed border-line pt-5 font-mono text-[0.7rem] lowercase text-faint";
