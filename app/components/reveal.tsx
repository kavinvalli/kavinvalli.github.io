"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One observer for the whole site rather than a wrapper component per section.
// Sections opt in with a bare `data-reveal` attribute, which keeps the page
// grid intact — a wrapper <div> around a `.section` would become the grid item
// and break the subgrid the breakout track depends on.
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    // set by the inline script in the layout, and only when motion is welcome
    if (!document.documentElement.hasAttribute("data-motion")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          // one-way: scrolling back up shouldn't replay anything
          observer.unobserve(entry.target);
        }
      },
      // fire a little before the element reaches the bottom edge, so it has
      // finished arriving by the time it's properly in view
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
