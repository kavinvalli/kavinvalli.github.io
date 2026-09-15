// Shared between the inline script in the layout, which resolves the theme
// before first paint, and the toggle that changes it afterwards. Both write
// the same attribute and the same storage key, so they have to agree.

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

// Mirrors --color-background for each palette in globals.css. Browser chrome
// (the address bar on mobile, the title bar on desktop Safari) reads this off
// the meta tag, and a black bar over a white page is worse than none.
export const THEME_COLOR: Record<Theme, string> = {
  dark: "#000000",
  light: "#faf9f7",
};

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

// What the page is actually painting right now. `data-theme` is absent only
// before the inline script has run, in which case the CSS is falling back to
// the media query and so should this.
export function currentTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (isTheme(stored)) return stored;
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
}
