"use client";

import * as React from "react";
import { ComponentCard } from "@/components/site/component-card";
import { GRID_COLS, CARD_LAYOUT } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { useSearch, type SearchHit } from "@/lib/use-search";
import { componentsMeta } from "@/__registry__/meta.gen";

const PAGE = 24;
const byName = new Map(componentsMeta.map((c) => [c.name, c]));

/** Yes/no filters, each read from the component's record. */
const FLAGS: { id: string; label: string; test: (h: SearchHit) => boolean }[] =
  [
    { id: "nodeps", label: "No dependencies", test: (h) => h.deps === 0 },
    {
      id: "light",
      label: "Light at runtime",
      test: (h) => h.weight === "light",
    },
    {
      id: "content",
      label: "Takes my content",
      test: (h) =>
        h.content === "props" ||
        h.content === "children" ||
        h.content === "data-array",
    },
  ];

/**
 * The search results page: describe what you need, see every match as a real
 * card (clip, title, tagline), best first. The query lives in the URL, so a
 * search can be shared and the back button works.
 *
 * There is no search box on this page: the one search is in the header, which
 * shows this page's query and reopens with it for refining.
 */
export function SearchResults({ query }: { query: string }) {
  const [kind, setKind] = React.useState<string | null>(null);
  const [flags, setFlags] = React.useState<Set<string>>(new Set());
  const [limit, setLimit] = React.useState(PAGE);
  const sentinel = React.useRef<HTMLDivElement>(null);
  const { answer, pending } = useSearch(query);

  // A new answer starts from the top with no filters left over from the last one.
  React.useEffect(() => {
    setKind(null);
    setFlags(new Set());
    setLimit(PAGE);
  }, [answer]);

  const hits = React.useMemo(
    () => (answer?.items ?? []).filter((h) => byName.has(h.name)),
    [answer],
  );

  const kinds = React.useMemo(() => {
    const count = new Map<string, number>();
    for (const h of hits) count.set(h.kind, (count.get(h.kind) ?? 0) + 1);
    return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7);
  }, [hits]);

  const filtered = React.useMemo(
    () =>
      hits.filter(
        (h) =>
          (!kind || h.kind === kind) &&
          FLAGS.every((f) => !flags.has(f.id) || f.test(h)),
      ),
    [hits, kind, flags],
  );

  const visible = filtered.slice(0, limit);
  const hasMore = limit < filtered.length;

  React.useEffect(() => {
    if (!hasMore) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setLimit((l) => l + PAGE);
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, visible.length]);

  const q = query.trim();
  const toggle = (id: string) =>
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="w-full py-10">
      <div className="mb-6 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          {q ? (
            <>
              Results for <span className="text-muted-foreground">“{q}”</span>
            </>
          ) : (
            "Search"
          )}
        </h1>
        <p className="mt-1.5 font-mono text-sm text-muted-foreground">
          {!q
            ? "press ⌘K and describe what you need in plain words"
            : !answer
              ? pending
                ? "searching…"
                : "type at least two characters"
              : answer.weak
                ? "no close match · showing the nearest components"
                : `${answer.total} component${answer.total === 1 ? "" : "s"} · best match first`}
        </p>
      </div>

      {hits.length > 0 && !answer?.weak && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Chip pressed={!kind} onClick={() => setKind(null)}>
            Any kind
          </Chip>
          {kinds.map(([k, n]) => (
            <Chip
              key={k}
              pressed={kind === k}
              onClick={() => setKind(kind === k ? null : k)}
            >
              {k.replaceAll("-", " ")}
              <span className="ml-1.5 font-mono text-[11px] opacity-60">
                {n}
              </span>
            </Chip>
          ))}
          <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          {FLAGS.map((f) => (
            <Chip
              key={f.id}
              pressed={flags.has(f.id)}
              onClick={() => toggle(f.id)}
            >
              {f.label}
            </Chip>
          ))}
        </div>
      )}

      {answer && filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {hits.length
            ? "Nothing matches those filters."
            : `No components match “${q}”.`}
        </p>
      ) : (
        <>
          <div
            className={cn(
              "grid",
              CARD_LAYOUT === "gap"
                ? "gap-x-5 gap-y-8"
                : "border-l border-t border-border",
              GRID_COLS[3],
            )}
          >
            {visible.map((h) => (
              <ComponentCard
                key={h.name}
                item={byName.get(h.name)!}
                className={
                  CARD_LAYOUT === "gap"
                    ? undefined
                    : "border-r border-b border-border p-3 hover:bg-muted/20"
                }
                note={
                  h.match ? (
                    <>
                      matched{" "}
                      <span className="text-foreground/70">{h.match}</span>
                    </>
                  ) : undefined
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

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pressed
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
