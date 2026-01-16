import * as React from "react";
import { cn } from "@/lib/utils";

/** "Mind Crawl" gradient. */
export const GradientMindCrawl_CSS = "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)";

export function GradientMindCrawl({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)", ...style }}
      {...props}
    />
  );
}
