"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ComponentCard } from "@/components/site/component-card";
import { categoryConfig } from "@/lib/categories";
import type { ComponentMeta } from "@/__registry__/meta.gen";

export interface HomeSection {
  slug: string;
  label: string;
  count: number;
  items: ComponentMeta[];
}

const ROW_SIZE = 8;
const PAGE = 5;

/**
 * The "all components" rows: one horizontal preview row per category, with
 * infinite scroll over the CATEGORIES — only a handful of rows render at first,
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

  return (
    <div className="divide-y divide-border">
      {visible.map((section) => (
        <section key={section.slug} className="py-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link
              href={`/category/${section.slug}`}
              className="group flex items-baseline gap-2"
            >
              <h2 className="text-lg font-semibold tracking-tight group-hover:underline">
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

          <div className="scrollbar-thin -mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2">
            {section.items.slice(0, ROW_SIZE).map((item) => (
              <div
                key={item.name}
                className="w-[300px] shrink-0 snap-start sm:w-[320px]"
              >
                <ComponentCard
                  item={item}
                  designWidth={categoryConfig(section.slug).designWidth}
                  className="h-full rounded-xl border border-border p-3 hover:bg-muted/20"
                />
              </div>
            ))}
            {section.count > ROW_SIZE && (
              <Link
                href={`/category/${section.slug}`}
                className="flex w-[160px] shrink-0 snap-start flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                style={{ height: 180 + 44 }}
              >
                <ChevronRight className="size-5" />+{section.count - ROW_SIZE} more
              </Link>
            )}
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
