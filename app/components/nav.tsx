"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Persistent across routes so switching tabs swaps only the content below —
// it should read as one site, not as navigating away.
const items = [
  { href: "/", label: "Kavin" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-10 bg-background/80 backdrop-blur-md backdrop-saturate-150"
    >
      <div className="mx-auto flex w-full max-w-(--width-wide) gap-6 px-gutter py-[1.1rem]">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              // the rule under each item wipes out from the left rather than
              // fading, so switching tabs reads as movement between them
              className={`relative font-mono text-[0.78rem] transition-colors after:absolute after:inset-x-0 after:-bottom-[0.3rem] after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:text-foreground ${
                active
                  ? "text-accent after:scale-x-100"
                  : "text-faint after:scale-x-0 hoverable:hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* reading position — drawn from the scroll offset in CSS, see globals */}
      <span
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent/70"
      />
    </nav>
  );
}
