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
}

export function CodeBlock({
  html,
  code,
  className,
  maxHeight = 440,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-muted/30",
        className,
      )}
    >
      <CopyButton
        value={code}
        toastMessage="Component code copied"
        className="absolute right-3 top-3 z-10 size-8 border border-border bg-background/70 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
      />
      <div
        style={{ maxHeight }}
        className="scrollbar-thin overflow-auto p-4 [&_pre]:!bg-transparent [&_pre]:!outline-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
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
    <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
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
