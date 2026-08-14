"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Persistent across routes so switching tabs swaps only the content below —
// it should read as one site, not as navigating away.
const items = [
  { href: "/", label: "Kavin" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Main">
      <div className="navInner">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "navLink navLinkActive" : "navLink"}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
