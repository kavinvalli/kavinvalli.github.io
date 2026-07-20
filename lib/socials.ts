// Single source of truth for socials — consumed by the homepage and /api/contacts.
export type Social = {
  medium: string;
  username: string;
  link: string;
};

export const socials: Social[] = [
  {
    medium: "GitHub",
    username: "kavinvalli",
    link: "https://github.com/kavinvalli",
  },
  {
    medium: "X",
    username: "kavinvalli",
    link: "https://x.com/kavinvalli",
  },
  {
    medium: "LinkedIn",
    username: "kavinvalli",
    link: "https://www.linkedin.com/in/kavinvalli/",
  },
  {
    medium: "Email",
    username: "mail@kavin.me",
    link: "mailto:mail@kavin.me",
  },
];
