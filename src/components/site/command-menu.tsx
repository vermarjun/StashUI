"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { componentsMeta } from "@/__registry__/meta.gen";
import { cn } from "@/lib/utils";

const MAX_RESULTS = 50;

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

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

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? componentsMeta.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.name.toLowerCase().includes(q) ||
            (c.library ?? "").toLowerCase().includes(q),
        )
      : componentsMeta;
    return pool.slice(0, MAX_RESULTS);
  }, [query]);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-8 w-full items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted sm:w-56",
        )}
      >
        <Search className="size-3.5" />
        <span className="flex-1 text-left">Search components…</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder="Search components by name or library…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          <CommandGroup
            heading={`${results.length}${results.length === MAX_RESULTS ? "+" : ""} results`}
          >
            {results.map((c) => (
              <CommandItem
                key={c.name}
                value={c.name}
                onSelect={() => go(`/c/${c.name}`)}
              >
                <span className="truncate">{c.title}</span>
                <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">
                  {c.library ?? c.category}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
