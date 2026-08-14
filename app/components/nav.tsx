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
              className={`font-mono text-[0.78rem] transition-colors hover:text-foreground ${
                active ? "text-accent" : "text-faint"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
