"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ComponentCard } from "@/components/site/component-card";
import { categoryConfig } from "@/lib/categories";
import { getPreview } from "@/__registry__/previews.gen";
import { warmPosters } from "@/lib/preview-quality";
import type { ComponentMeta } from "@/__registry__/meta.gen";

export interface HomeSection {
  slug: string;
  label: string;
  count: number;
  items: ComponentMeta[];
}

const ROW_SIZE = 3;
const PAGE = 5;

/**
 * The "all components" rows: one horizontal preview row per category, with
 * infinite scroll over the CATEGORIES: only a handful of rows render at first,
 * and more categories appear as you reach the bottom. Combined with the
 * deactivate-when-offscreen previews, the page stays light no matter how many
 * shader-heavy components exist.
 */
export function HomeSections({ sections }: { sections: HomeSection[] }) {
  const [limit, setLimit] = React.useState(PAGE);
  const sentinel = React.useRef<HTMLDivElement>(null);
  const visible = sections.slice(0, limit);
  const hasMore = limit < sections.length;

  React.useEffect(() => {
    if (!hasMore) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setLimit((l) => l + PAGE);
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, visible.length]);

  // While the user reads the rows on screen, fetch the posters of the next
  // batch of categories so they appear fully painted when loaded.
  React.useEffect(() => {
    const next = sections.slice(limit, limit + PAGE).flatMap((s) =>
      s.items.slice(0, ROW_SIZE).map((m) => ({ name: m.name, ...getPreview(m.name) })),
    );
    warmPosters(next.filter((n) => n.hasVideo));
  }, [sections, limit]);

  return (
    <div>
      {visible.map((section) => (
        <section key={section.slug} className="py-10 first:pt-12">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link
              href={`/category/${section.slug}`}
              className="group flex items-baseline gap-2"
            >
              <h2 className="text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline">
                {section.label}
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {section.count}
              </span>
            </Link>
            <Link
              href={`/category/${section.slug}`}
              className="flex shrink-0 items-center gap-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
              <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {section.items.slice(0, ROW_SIZE).map((item, i) => (
              <ComponentCard
                key={item.name}
                item={item}
                designWidth={categoryConfig(section.slug).designWidth}
                // 2 cards on tablet, 3 on desktop: hide the 3rd below xl so
                // a row never ends with an orphan.
                className={i === 2 ? "hidden xl:flex" : undefined}
              />
            ))}
          </div>
        </section>
      ))}

      {hasMore && (
        <div
          ref={sentinel}
          className="py-10 text-center font-mono text-xs text-muted-foreground"
        >
          loading more categories…
        </div>
      )}
    </div>
  );
}
