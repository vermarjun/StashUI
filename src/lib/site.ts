/**
 * One place for the things that were previously hardcoded — or worse, guessed —
 * in several files: the name in the header, the repo the GitHub icon points at,
 * and the origin the install command is built from.
 *
 * `url` is the SSR fallback for the install command. Before this existed the
 * fallback was the literal string "https://your-domain", which is what a visitor
 * saw for the first paint of every component page.
 */
export const siteConfig = {
  name: "StashUI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stashui.vercel.app",
  repo: "https://github.com/vermarjun/StashUI",
  description:
    "A curated component library built on shadcn. Browse, preview, copy, and " +
    "install 1500+ components from one place — or let an agent navigate them over MCP.",
} as const;

export type SiteConfig = typeof siteConfig;
