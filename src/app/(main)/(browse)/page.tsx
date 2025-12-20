import { componentsMeta } from "@/__registry__/meta.gen";
import { CATEGORY_CONFIG } from "@/lib/categories";
import { HomeSections } from "@/components/site/home-sections";

const ROW_SIZE = 8;

const byCategory = componentsMeta.reduce<Record<string, typeof componentsMeta>>(
  (acc, m) => {
    (acc[m.category] ??= []).push(m);
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
          Personal Component Library
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Every component I love,
          <br />
          in one clean place.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-muted-foreground">
          {total.toLocaleString()} components, organized by what they are — every
          button together, every background together. Browse the rows below, pick
          a type from the sidebar, or press{" "}
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
            <span className="text-foreground">{sections.length}</span> types
          </span>
        </div>
      </section>

      {/* Horizontal preview rows, one per category (infinite scroll) */}
      <HomeSections sections={sections} />
    </div>
  );
}
