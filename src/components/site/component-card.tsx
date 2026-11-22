"use client";

import type * as React from "react";
import Link from "next/link";
import { ComponentPreview } from "@/components/site/component-preview";
import { GridVideo } from "@/components/site/grid-video";
import { getPreview } from "@/__registry__/previews.gen";
import { cn } from "@/lib/utils";
import type { ComponentMeta } from "@/__registry__/meta.gen";

/**
 * A component tile: a full-bleed preview "stage" (looped clip, or the live
 * iframe when no clip exists) with the title and source library underneath.
 * The whole tile is one link to the detail page.
 *
 * The stage is always dark: every clip is recorded on a dark canvas, so a dark
 * frame keeps the grid calm in both site themes instead of punching black
 * rectangles into a white page.
 */
export function ComponentCard({
  item,
  designWidth,
  className,
  note,
}: {
  item: ComponentMeta;
  designWidth?: number;
  className?: string;
  /** A small extra line under the tagline, e.g. why a search matched this card. */
  note?: React.ReactNode;
}) {
  const nextOnly = !item.frameworks.includes("react");
  return (
    <Link
      href={`/c/${item.name}`}
      aria-label={item.title}
      className={cn(
        "group/card flex flex-col gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <div className="preview-stage relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0a0a] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset] transition-[border-color,box-shadow] duration-300 group-hover/card:border-white/20 group-hover/card:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none select-none">
          {getPreview(item.name).hasVideo ? (
            <GridVideo name={item.name} title={item.title} />
          ) : (
            <ComponentPreview name={item.name} designWidth={designWidth} />
          )}
        </div>
      </div>
      <div className="flex min-w-0 items-baseline justify-between gap-3 px-0.5">
        <span className="truncate text-sm font-medium text-foreground/90 transition-colors group-hover/card:text-foreground">
          {item.title}
        </span>
        <span className="shrink-0 truncate text-xs text-muted-foreground">
          {nextOnly ? "Next.js only" : item.library ?? ""}
        </span>
      </div>
      {item.tagline && (
        <p className="-mt-1.5 line-clamp-1 px-0.5 text-xs text-muted-foreground">{item.tagline}</p>
      )}
      {note && (
        <p className="-mt-2 line-clamp-1 px-0.5 text-[11px] text-muted-foreground/70">{note}</p>
      )}
    </Link>
  );
}
