"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { componentsMeta } from "@/__registry__/meta.gen";
import { CATEGORY_CONFIG } from "@/lib/categories";

const counts = componentsMeta.reduce<Record<string, number>>((acc, m) => {
  acc[m.category] = (acc[m.category] || 0) + 1;
  return acc;
}, {});

const cats = CATEGORY_CONFIG.filter((c) => (counts[c.slug] ?? 0) > 0);

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 self-start overflow-y-auto border-r border-border py-6 pr-3 lg:block scrollbar-thin">
      <nav className="space-y-1">
        <Link
          href="/"
          className={cn(
            "mb-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
            pathname === "/"
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          <LayoutGrid className="size-3.5" />
          All components
        </Link>

        <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          Types
        </p>
        <ul className="space-y-0.5">
          {cats.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <span className="truncate">{c.label}</span>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground/70">
                    {counts[c.slug]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
