"use client";

import * as React from "react";
import { ComponentCard } from "@/components/site/component-card";
import { GRID_COLS, CARD_LAYOUT } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { ComponentMeta } from "@/__registry__/meta.gen";

const PAGE = 24;

/**
 * Grid of component cards with INFINITE SCROLL (no "load more"). A sentinel
 * near the bottom reveals the next page as you scroll. Layout (columns +
 * preview height) is per component type.
 *
 * There is no search box here: the one search is in the header (Cmd K), with
 * its results page at /search.
 */
export function ComponentGrid({
  items,
  cols = 3,
  designWidth = 900,
}: {
  items: ComponentMeta[];
  cols?: number;
  designWidth?: number;
}) {
  const [limit, setLimit] = React.useState(PAGE);
  const sentinel = React.useRef<HTMLDivElement>(null);

  const visible = items.slice(0, limit);
  const hasMore = limit < items.length;

  React.useEffect(() => {
    if (!hasMore) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLimit((l) => l + PAGE);
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, visible.length]);

  return (
    <div>
      <div
        className={cn(
          "grid",
          CARD_LAYOUT === "gap"
            ? "gap-x-5 gap-y-8"
            : "border-l border-t border-border",
          GRID_COLS[cols] ?? GRID_COLS[3],
        )}
      >
        {visible.map((item) => (
          <ComponentCard
            key={item.name}
            item={item}
            designWidth={designWidth}
            className={
              CARD_LAYOUT === "gap"
                ? undefined
                : "border-r border-b border-border p-3 hover:bg-muted/20"
            }
          />
        ))}
      </div>

      {hasMore && (
        <div
          ref={sentinel}
          className="flex items-center justify-center py-10 font-mono text-xs text-muted-foreground"
        >
          loading more… ({visible.length} / {items.length})
        </div>
      )}
    </div>
  );
}
