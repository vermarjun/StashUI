/**
 * One place for the things that were previously hardcoded (or worse, guessed)
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
  tagline: "Agentic UI library",
  description:
    "An agentic UI library. Nearly 800 hand-picked shadcn components, indexed " +
    "so your agent can search them by what the screen needs and install the " +
    "best fit over MCP. People can browse, preview and copy them too.",
  mcp: "https://github.com/vermarjun/StashUI/tree/main/mcp",
} as const;

export type SiteConfig = typeof siteConfig;
