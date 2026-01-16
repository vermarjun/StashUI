import * as React from "react";
import { cn } from "@/lib/utils";

/** "Black Sea" gradient. */
export const GradientBlackSea_CSS = "linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%)";

export function GradientBlackSea({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%)", ...style }}
      {...props}
    />
  );
}
