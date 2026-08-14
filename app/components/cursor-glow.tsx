"use client";

import { useEffect, useRef } from "react";

// A pool of accent light that trails the pointer, behind the page content.
// Only the transform changes frame to frame, so the blurred gradient is
// rasterised once and then just moved around by the compositor.
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = ref.current;
    if (!glow) return;

    // nothing to follow without a real pointer, and it's motion either way
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let running = false;

    const draw = () => {
      // ease toward the pointer instead of pinning to it — the lag is what
      // keeps it feeling like light rather than a cursor
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (running) return;
      // start where the pointer already is, so it doesn't sweep in from 0,0
      running = true;
      x = targetX;
      y = targetY;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      glow.style.opacity = "1";
      frame = requestAnimationFrame(draw);
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    const onEnter = () => {
      if (running) glow.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
