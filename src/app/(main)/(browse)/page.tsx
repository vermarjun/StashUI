import { componentsMeta } from "@/__registry__/meta.gen";
import { CATEGORY_CONFIG } from "@/lib/categories";
import { HomeSections } from "@/components/site/home-sections";
import { siteConfig } from "@/lib/site";

const ROW_SIZE = 3;

const byCategory = componentsMeta.reduce<Record<string, typeof componentsMeta>>(
  (acc, m) => {
    for (const c of m.categories) (acc[c] ??= []).push(m);
    return acc;
  },
  {},
);

export default function Home() {
  const total = componentsMeta.length;
  const sections = CATEGORY_CONFIG.map((c) => {
    const items = byCategory[c.slug] ?? [];
    return {
      slug: c.slug,
      label: c.label,
      count: items.length,
      // only ship the first rowful of metadata to the client
      items: items.slice(0, ROW_SIZE),
    };
  }).filter((s) => s.count > 0);

  return (
    <div className="w-full pb-16">
      {/* Hero */}
      <section className="border-b border-border py-14 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Describe the screen.{" "}
          <br className="hidden sm:block" />
          Your agent picks the parts.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-muted-foreground">
          {total.toLocaleString()} hand-picked components your agent can see:
          it asks in words and gets back images to choose from.{" "}
          <a
            href={siteConfig.mcp}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Set it up with one prompt
          </a>
          , or browse below and press{" "}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            ⌘K
          </kbd>{" "}
          to search.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
          <span>
            <span className="text-foreground">{total.toLocaleString()}</span>{" "}
            components
          </span>
          <span>
            <span className="text-foreground">{sections.length}</span> categories
          </span>
          <span>
            <span className="text-foreground">1</span> prompt to set up
          </span>
        </div>
      </section>

      {/* Horizontal preview rows, one per category (infinite scroll) */}
      <HomeSections sections={sections} />
    </div>
  );
}
