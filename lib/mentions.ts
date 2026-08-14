// Places I've been written about — as opposed to /writing, which is what I wrote.
// Homepage section for now; lift into app/elsewhere/page.tsx once this grows past ~5.
export type Mention = {
  title: string;
  publisher: string;
  date: string;
  link: string;
  note: string;
  quote?: string;
};

export const mentions: Mention[] = [
  {
    title: "Inside the Vercel intern experience",
    publisher: "Vercel",
    date: "2026-08-13",
    link: "https://vercel.com/blog/inside-the-vercel-intern-experience",
    note: "Profiled on my term with the v0 team — shipping Folders and Projects end-to-end, the manual commit button for version history, tiered VM pools that cut infrastructure cost for ~80% of sandboxes, and ownership of the v0 Slack agent.",
    quote:
      "I like being in that kind of environment where things are moving fast and you have to figure it out as you go.",
  },
  {
    title: "Cole Gottdank on my technical design review at Helicone",
    publisher: "LinkedIn",
    date: "2024-11-18",
    link: "https://www.linkedin.com/posts/colegottdank_first-year-students-dont-usually-leave-founding-ugcPost-7264344372240904192-6iBn",
    note: "Helicone's co-founder, after I led a design review on one of their most complex features. It started as a cold email.",
    quote:
      "He broke down one of our most complex features with the precision of a senior engineer.",
  },
];
