"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ComponentPreview } from "@/components/site/component-preview";
import { componentsMeta, type ComponentMeta } from "@/__registry__/meta.gen";
import { getPreview } from "@/__registry__/previews.gen";
import { clipUrls } from "@/lib/preview-quality";
import { cn } from "@/lib/utils";
import { matchesWords, useSearch, type SearchHit } from "@/lib/use-search";

const MAX_RESULTS = 12;
const SEE_ALL = "__see-all__";
const byName = new Map(componentsMeta.map((c) => [c.name, c]));
const byLowerName = new Map(
  componentsMeta.map((c) => [c.name.toLowerCase(), c]),
);

function urlsFor(name: string) {
  const { v, tiers } = getPreview(name);
  return clipUrls(name, v, tiers);
}

/**
 * The header search. Describe what you need: the list shows the best matches
 * with a thumbnail each, and the highlighted one plays on the right, so you
 * choose by looking without leaving the page you are on. The first row is
 * "See all results" (/search), so Enter on a fresh search opens the full grid;
 * arrow down and Enter opens one component. Cmd+Enter always opens /search.
 */
export function CommandMenu() {
  const router = useRouter();
  // On the results page the header bar shows that page's query, and opening the
  // popup starts from it, so there is one search box and it is this one.
  const pathname = usePathname();
  const params = useSearchParams();
  const pageQuery =
    pathname === "/search" ? (params.get("q") ?? "").trim() : "";
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState("");

  // Opening starts from the page's query (empty anywhere but the results page);
  // closing clears the box, so the next Cmd K never appends to the last search.
  const setOpenAndReset = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      setQuery(next ? pageQuery : "");
      setSelected("");
    },
    [pageQuery],
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenAndReset(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpenAndReset]);

  // Plain-English search over the whole catalogue (/api/search); a local word
  // match fills in until the server answers.
  const { answer } = useSearch(open ? query : "");
  const q = query.trim();

  const results = React.useMemo(() => {
    const pool = !q
      ? componentsMeta
      : answer
        ? answer.names.flatMap((n) => byName.get(n) ?? [])
        : componentsMeta.filter((c) =>
            matchesWords(q, c.title, c.name, c.library, c.tagline),
          );
    return pool.slice(0, MAX_RESULTS);
  }, [q, answer]);

  const hits = React.useMemo(
    () =>
      new Map<string, SearchHit>((answer?.items ?? []).map((h) => [h.name, h])),
    [answer],
  );
  const total = q && answer ? answer.total : null;

  // The previewed component is the highlighted row; before anything is
  // highlighted (or on "See all"), the first result.
  const current = byLowerName.get(selected.toLowerCase()) ?? results[0] ?? null;

  // When an answer arrives its "See all" row is the highlighted one. Without
  // this the highlight would stay on whichever row happened to be first while
  // the request was in flight, and Enter would do different things by timing.
  React.useEffect(() => {
    if (q && answer && answer.total > 0) setSelected(SEE_ALL);
  }, [q, answer]);

  const go = React.useCallback(
    (href: string) => {
      setOpenAndReset(false);
      router.push(href);
    },
    [router, setOpenAndReset],
  );
  const seeAll = React.useCallback(() => {
    if (q) go(`/search?q=${encodeURIComponent(q)}`);
  }, [q, go]);

  return (
    <>
      <button
        onClick={() => setOpenAndReset(true)}
        className={cn(
          "inline-flex h-8 w-full items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted sm:w-64",
        )}
      >
        <Search className="size-3.5" />
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-left",
            pageQuery && "text-foreground",
          )}
        >
          {pageQuery || "Describe what you need…"}
        </span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpenAndReset}
        title="Search components"
        description="Describe what you need, or type a name."
        className="top-1/2 -translate-y-1/2 sm:max-w-[min(940px,calc(100%-2rem))]"
        commandProps={{
          // No padding on the shell: the divider and the hairlines have to reach
          // the popup's edges, and the clip sits flush in its corner.
          className: "p-0",
          shouldFilter: false,
          value: selected,
          onValueChange: setSelected,
          onKeyDown: (e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              seeAll();
            }
          },
        }}
      >
        {/* Two columns for the whole height: the search (box, results, keys) on the
            left, the highlighted component on the right. */}
        <div className="grid h-[min(456px,84vh)] min-h-0 md:grid-cols-[minmax(0,11fr)_minmax(0,13fr)]">
          <div className="flex min-h-0 min-w-0 flex-col">
            <div className="shrink-0 px-1 pt-1">
              <CommandInput
                placeholder="Describe what you need, or type a name…"
                value={query}
                onValueChange={setQuery}
              />
            </div>
            <CommandList className="max-h-none min-h-0 flex-1 px-1">
              <CommandEmpty>No components found.</CommandEmpty>
              <CommandGroup
                // No count here: the "See all N results" row right below already says it.
                heading={
                  !q
                    ? "All components"
                    : answer?.weak
                      ? "No close match · nearest components"
                      : total != null
                        ? undefined
                        : "Searching…"
                }
              >
                {/* First in the list, so Enter on a fresh search goes to the full
                    results; arrow down to open one component instead. */}
                {q && total != null && total > 0 && (
                  <CommandItem
                    value={SEE_ALL}
                    onSelect={seeAll}
                    className="gap-3 py-2.5"
                  >
                    <span className="flex h-[40px] w-16 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground">
                      <ArrowRight className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      See all {total} result{total === 1 ? "" : "s"}
                    </span>
                  </CommandItem>
                )}
                {results.map((c) => (
                  <CommandItem
                    key={c.name}
                    value={c.name}
                    onSelect={() => go(`/c/${c.name}`)}
                    className="gap-3 py-2"
                  >
                    <Thumb name={c.name} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">
                        {c.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {c.tagline || c.library || c.category}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex h-10 shrink-0 items-center gap-4 border-t border-border px-4 text-xs text-muted-foreground">
              <span>
                <Key>↑</Key>
                <Key>↓</Key> move
              </span>
              <span>
                <Key>↵</Key> open
              </span>
              {q && (
                <button
                  type="button"
                  onClick={seeAll}
                  className="ml-auto rounded outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Key>⌘↵</Key> see all results
                </button>
              )}
            </div>
          </div>

          <div className="hidden min-h-0 min-w-0 flex-col border-l border-border md:flex">
            {current && <Preview item={current} hit={hits.get(current.name)} />}
          </div>
        </div>
      </CommandDialog>
    </>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mr-1 inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[10px] text-foreground">
      {children}
    </kbd>
  );
}

/** The poster as a small still. Rows never play video: only the preview pane does. */
function Thumb({ name }: { name: string }) {
  const urls = urlsFor(name);
  const [failed, setFailed] = React.useState(false);
  return (
    <span className="relative h-[40px] w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
      {!failed && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={urls.poster}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );
}

/** The highlighted result, playing. One clip at a time, restarted when the row changes. */
function Preview({ item, hit }: { item: ComponentMeta; hit?: SearchHit }) {
  const preview = getPreview(item.name);
  const urls = urlsFor(item.name);
  return (
    <>
      {/* The clip sits flush against the pane's top and sides, at the clip's own
          shape, so it is never letterboxed or cropped. */}
      <div className="preview-stage relative aspect-[8/5] w-full shrink-0 overflow-hidden bg-[#0a0a0a]">
        {preview.hasVideo ? (
          <video
            key={item.name}
            src={urls.video("md")}
            poster={urls.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={`${item.title} preview`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 select-none">
            <ComponentPreview name={item.name} />
          </div>
        )}
      </div>
      {/* Title and description, nothing else. The popup's height is set so four
          lines of description fit exactly under the clip. */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col border-t border-border px-4 pb-3 pt-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="truncate text-[15px] font-semibold">
            {item.title}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {item.library ?? ""}
          </span>
        </div>
        <p
          className={cn(
            "mt-1 text-[13px] leading-5 text-muted-foreground",
            hit?.match ? "line-clamp-3" : "line-clamp-4",
          )}
        >
          {item.description || item.tagline}
        </p>
        {hit?.match && (
          <p className="mt-1.5 truncate text-xs text-muted-foreground/70">
            matched <span className="text-foreground/70">{hit.match}</span>
          </p>
        )}
      </div>
    </>
  );
}
