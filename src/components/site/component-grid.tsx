"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ComponentCard } from "@/components/site/component-card";
import { GRID_COLS, CARD_LAYOUT } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { ComponentMeta } from "@/__registry__/meta.gen";

const PAGE = 24;

/**
 * Filterable grid of component cards with INFINITE SCROLL (no "load more"). A
 * sentinel near the bottom reveals the next page as you scroll. Layout (columns
 * + preview height) is per component type.
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
  const [query, setQuery] = React.useState("");
  const [limit, setLimit] = React.useState(PAGE);
  const sentinel = React.useRef<HTMLDivElement>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q),
    );
  }, [items, query]);

  const visible = filtered.slice(0, limit);
  const hasMore = limit < filtered.length;

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
      <div className="relative mb-6 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Filter components…"
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No components match “{query}”.
        </p>
      ) : (
        <>
          <div
            className={cn(
              "grid",
              CARD_LAYOUT === "gap"
                ? "gap-4"
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
                    ? "rounded-xl bg-card/40 p-3 hover:bg-card/70"
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
              loading more… ({visible.length} / {filtered.length})
            </div>
          )}
        </>
      )}
    </div>
  );
}
