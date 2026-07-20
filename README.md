# kavin.me

My personal site — [kavin.me](https://kavin.me). Next.js (App Router), deployed on Vercel.

## Structure

- `app/page.js` — home (about, projects, recent writing)
- `app/writing` — the blog: index + `[slug]` article pages
- `content/writing/*.mdx` — articles (frontmatter: `title`, `description`, `date`, `draft`)
- `lib/` — shared data (`projects`, `socials`) and the MDX loader
- `app/s/[shortlink]/route.js` — Airtable-backed URL shortener
- `app/api/*` — projects/contacts JSON endpoints

## Writing

Drop an `.mdx` file in `content/writing/`. Newest `date` sorts first; `draft: true` hides it in production.

## Develop

```bash
pnpm install
pnpm dev
```
