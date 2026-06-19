"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// The real CodeTabsMdx is an async server component (it highlights MDX children
// with shiki at build time), so it can't render in the client-side live
// preview. This is a faithful, client-safe stand-in showing the same tabbed
// install-command UX; the detail page still lists the real component source.
const TABS = [
  { value: "ui-layouts", label: "ui-layouts", code: "npx ui-layouts add code-tabs-mdx" },
  { value: "shadcn", label: "shadcn", code: "npx shadcn@latest add code-tabs-mdx" },
];

export default function Demo() {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied((c) => (c === code ? null : c)), 1200);
  };

  return (
    <div className="w-full max-w-xl">
      <Tabs
        defaultValue="ui-layouts"
        className="rounded-xl border border-border bg-card p-1.5"
      >
        <TabsList className="bg-transparent">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="text-xs">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="relative mt-1">
            <button
              type="button"
              onClick={() => copy(t.code)}
              aria-label="Copy code"
              className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {copied === t.code ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
            <pre className="overflow-x-auto rounded-lg bg-muted/40 p-4 pr-10 text-sm leading-relaxed">
              <code className="font-mono text-foreground">
                <span className="text-muted-foreground">$ </span>
                {t.code}
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
