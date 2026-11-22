"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
const byLowerName = new Map(componentsMeta.map((c) => [c.name.toLowerCase(), c]));

function urlsFor(name: string) {
  const { v, tiers } = getPreview(name);
  return clipUrls(name, v, tiers);
}

/**
 * The header search. Describe what you need: the list shows the best matches
 * with a thumbnail each, and the highlighted one plays on the right, so you
 * choose by looking without leaving the page you are on. Enter opens the
 * highlighted component; "See all results" (or Cmd+Enter) opens /search.
 */
export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Plain-English search over the whole catalogue (/api/search); a local word
  // match fills in until the server answers.
  const { answer } = useSearch(open ? query : "");
  const q = query.trim();

  const results = React.useMemo(() => {
    const pool = !q
      ? componentsMeta
      : answer
        ? answer.names.flatMap((n) => byName.get(n) ?? [])
        : componentsMeta.filter((c) => matchesWords(q, c.title, c.name, c.library, c.tagline));
    return pool.slice(0, MAX_RESULTS);
  }, [q, answer]);

  const hits = React.useMemo(
    () => new Map<string, SearchHit>((answer?.items ?? []).map((h) => [h.name, h])),
    [answer],
  );
  const total = q && answer ? answer.total : null;

  // The previewed component is the highlighted row; before anything is
  // highlighted (or on "See all"), the first result.
  const current = byLowerName.get(selected.toLowerCase()) ?? results[0] ?? null;

  // Closing clears the box, so the next Cmd K starts a new search instead of
  // appending to the last one.
  const setOpenAndReset = React.useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setQuery("");
      setSelected("");
    }
  }, []);

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
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-8 w-full items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted sm:w-64",
        )}
      >
        <Search className="size-3.5" />
        <span className="flex-1 text-left">Describe what you need…</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpenAndReset}
        title="Search components"
        description="Describe what you need, or type a name."
        className="top-[12vh] sm:max-w-[min(920px,calc(100%-2rem))]"
        commandProps={{
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
        <CommandInput
          placeholder="Describe what you need, or type a name…"
          value={query}
          onValueChange={setQuery}
        />
        <div className="grid min-h-0 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <CommandList className="max-h-[min(460px,60vh)] md:border-r md:border-border">
            <CommandEmpty>No components found.</CommandEmpty>
            <CommandGroup
              heading={
                !q
                  ? "All components"
                  : answer?.weak
                    ? "No close match · nearest components"
                    : total != null
                      ? `${total} result${total === 1 ? "" : "s"} · best match first`
                      : "Searching…"
              }
            >
              {results.map((c) => (
                <CommandItem
                  key={c.name}
                  value={c.name}
                  onSelect={() => go(`/c/${c.name}`)}
                  className="gap-3 py-2"
                >
                  <Thumb name={c.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{c.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {c.tagline || c.library || c.category}
                    </span>
                  </span>
                </CommandItem>
              ))}
              {q && total != null && total > 0 && (
                <CommandItem value={SEE_ALL} onSelect={seeAll} className="gap-3 py-2.5">
                  <span className="flex h-[40px] w-16 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground">
                    <ArrowRight className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    See all {total} result{total === 1 ? "" : "s"}
                  </span>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>

          <div className="hidden min-w-0 md:block">
            {current && <Preview item={current} hit={hits.get(current.name)} />}
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-border px-3 py-2 text-xs text-muted-foreground">
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
  const facts = [
    hit?.kind.replaceAll("-", " "),
    hit?.weight && `${hit.weight} at runtime`,
    hit && (hit.deps ? `${hit.deps} npm dep${hit.deps > 1 ? "s" : ""}` : "no dependencies"),
    hit?.content && (hit.content === "hardcoded" ? "content hardcoded" : hit.content === "none" ? null : `content: ${hit.content}`),
  ].filter(Boolean) as string[];

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="preview-stage relative aspect-[8/5] w-full shrink-0 overflow-hidden rounded-lg border border-border bg-[#0a0a0a]">
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
      <div className="min-w-0 px-1">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-base font-semibold">{item.title}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{item.library ?? ""}</span>
        </div>
        <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
          {item.description || item.tagline}
        </p>
        {hit?.match && (
          <p className="mt-1.5 truncate text-xs text-muted-foreground/70">
            matched <span className="text-foreground/70">{hit.match}</span>
          </p>
        )}
        {facts.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {facts.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
