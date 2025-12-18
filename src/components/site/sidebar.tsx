"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { componentsMeta, categories } from "@/__registry__/meta.gen";

function titleCase(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

export function Sidebar() {
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const ids = componentsMeta.map((c) => c.name);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 pr-4 lg:block scrollbar-thin">
      <nav className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <a
              href={`#${category}`}
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground/80"
            >
              {titleCase(category)}
            </a>
            <ul className="space-y-0.5 border-l border-border">
              {componentsMeta
                .filter((c) => c.category === category)
                .map((c) => (
                  <li key={c.name}>
                    <a
                      href={`#${c.name}`}
                      className={cn(
                        "-ml-px block border-l border-transparent py-1 pl-3 text-sm transition-colors hover:text-foreground",
                        active === c.name
                          ? "border-foreground font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
