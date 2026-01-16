import * as React from "react";
import { cn } from "@/lib/utils";

/** "Great Whale" gradient. */
export const GradientGreatWhale_CSS = "linear-gradient(0deg, #a3bded 0%, #6991c7 100%)";

export function GradientGreatWhale({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #a3bded 0%, #6991c7 100%)", ...style }}
      {...props}
    />
  );
}
