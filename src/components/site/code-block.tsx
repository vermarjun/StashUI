"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/site/copy-button";
import { siteConfig } from "@/lib/site";

interface CodeBlockProps {
  html: string;
  code: string;
  className?: string;
  maxHeight?: number;
  /** Show a "Show all" fade + button when the code is taller than maxHeight. */
  collapsible?: boolean;
}

export function CodeBlock({
  html,
  code,
  className,
  maxHeight = 440,
  collapsible = false,
}: CodeBlockProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [overflows, setOverflows] = React.useState(false);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const el = bodyRef.current;
    if (el) setOverflows(el.scrollHeight > maxHeight + 8);
  }, [html, maxHeight]);

  const clamp = collapsible && !expanded;
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-muted/20",
        className,
      )}
    >
      <CopyButton
        value={code}
        toastMessage="Code copied"
        className="absolute right-3 top-3 z-10 size-8 border border-border bg-background/70 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
      />
      <div
        ref={bodyRef}
        style={{ maxHeight: clamp || !collapsible ? maxHeight : undefined }}
        className={cn(
          "scrollbar-thin p-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!outline-none",
          clamp ? "overflow-hidden" : "overflow-auto",
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {collapsible && overflows && (
        <div
          className={cn(
            "flex justify-center pb-3",
            clamp &&
              "absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent pt-16",
          )}
        >
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {expanded ? "Collapse" : "Show all"}
          </button>
        </div>
      )}
    </div>
  );
}

export function InstallCommand({ name }: { name: string }) {
  // Start from the canonical URL so the command is correct on first paint,
  // then prefer the actual origin (previews, local dev) once mounted.
  const [origin, setOrigin] = React.useState<string>(siteConfig.url);
  React.useEffect(() => setOrigin(window.location.origin), []);

  const cmd = `npx shadcn@latest add ${origin}/r/${name}.json`;

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/20 py-1.5 pl-4 pr-1.5">
      <span className="select-none font-mono text-xs text-muted-foreground">
        $
      </span>
      <code className="scrollbar-thin flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs">
        {cmd}
      </code>
      <CopyButton value={cmd} toastMessage="Install command copied" />
    </div>
  );
}
