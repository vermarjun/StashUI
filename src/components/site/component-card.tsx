"use client";

import Link from "next/link";
import { ComponentPreview } from "@/components/site/component-preview";
import { GridVideo } from "@/components/site/grid-video";
import { FrameworkBadges } from "@/components/site/framework-badges";
import { getPreview } from "@/__registry__/previews.gen";
import { cn } from "@/lib/utils";
import type { ComponentMeta } from "@/__registry__/meta.gen";

/**
 * A component cell: the preview, a thin divider, then the name + brand logos.
 * It carries no box of its own — the grid container draws the shared thin lines
 * and provides the inner padding (the "gap" within the grid). Clicking anywhere
 * opens the detail page via an overlay link.
 */
export function ComponentCard({
  item,
  designWidth,
  className,
}: {
  item: ComponentMeta;
  designWidth?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col transition-colors",
        className,
      )}
    >
      <Link
        href={`/c/${item.name}`}
        aria-label={item.title}
        className="absolute inset-0 z-20 rounded-[inherit] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <div className="pointer-events-none select-none">
        {getPreview(item.name).hasVideo ? (
          <GridVideo name={item.name} title={item.title} />
        ) : (
          <ComponentPreview name={item.name} designWidth={designWidth} />
        )}
      </div>
      <div className="relative z-30 mt-3 flex items-center justify-between gap-2 border-t border-border pt-2.5">
        <span className="truncate text-sm font-medium">{item.title}</span>
        <FrameworkBadges frameworks={item.frameworks} />
      </div>
    </div>
  );
}
