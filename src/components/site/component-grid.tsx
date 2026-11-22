"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ComponentCard } from "@/components/site/component-card";
import { GRID_COLS, CARD_LAYOUT } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { matchesWords, useSearch } from "@/lib/use-search";
import type { ComponentMeta } from "@/__registry__/meta.gen";

const PAGE = 24;

/**
 * Searchable grid of component cards with INFINITE SCROLL (no "load more"). A
 * sentinel near the bottom reveals the next page as you scroll. Layout (columns
 * + preview height) is per component type.
 *
 * The box narrows THIS grid. It takes a description in plain words ("card that
 * tilts toward the mouse"): /api/search ranks the whole catalogue by words and
 * meaning, and the grid keeps the ones it holds, best match first. Searching
 * everything is the header search (Cmd K) and its results page, /search. Until the server answers, and
 * if it cannot be reached, a local word match keeps the box responsive.
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

  const { names: ranked } = useSearch(query);

  const filtered = React.useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    if (ranked) {
      const byName = new Map(items.map((i) => [i.name, i]));
      return ranked.flatMap((n) => byName.get(n) ?? []);
    }
    return items.filter((i) => matchesWords(q, i.title, i.name, i.tagline, i.description));
  }, [items, query, ranked]);

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
      <div className="relative mb-8 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Filter this category…"
          aria-label="Filter this category by describing what you need"
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
              loading more… ({visible.length} / {filtered.length})
            </div>
          )}
        </>
      )}
    </div>
  );
}
