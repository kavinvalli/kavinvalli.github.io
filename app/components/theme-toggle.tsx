"use client";

import { useEffect } from "react";
import {
  applyTheme,
  currentTheme,
  isTheme,
  THEME_STORAGE_KEY,
} from "./theme";

const icon = "size-[0.95rem]";

// Both icons ship on every render and CSS hides one, off the same selectors
// that activate the palette — see globals. Choosing in React would mean
// rendering something the server can't know and correcting it in an effect,
// i.e. the button flipping under the cursor a beat after the page arrives.
// `display: none` also drops the hidden icon's label from the accessibility
// tree, so the button announces the action it will actually perform.
export function ThemeToggle() {
  // Someone who has never touched the toggle is following their system, and
  // should keep following it when it changes at sunset rather than being
  // pinned to whatever it was when the tab opened.
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: light)");
    const sync = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {}
      if (isTheme(stored)) return;
      applyTheme(query.matches ? "light" : "dark");
    };

    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const next = currentTheme() === "light" ? "dark" : "light";
    applyTheme(next);
    // Private mode and blocked storage both throw here. The theme still
    // changes; it just won't survive the next navigation.
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle ml-auto flex cursor-pointer items-center self-center text-faint transition-colors hover:text-foreground"
    >
      <span data-theme-icon="sun">
        <SunIcon />
        <span className="sr-only">Switch to light theme</span>
      </span>
      <span data-theme-icon="moon">
        <MoonIcon />
        <span className="sr-only">Switch to dark theme</span>
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={icon}
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={icon}
    >
      <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
    </svg>
  );
}
