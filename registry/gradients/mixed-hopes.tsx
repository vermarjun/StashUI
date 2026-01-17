import * as React from "react";
import { cn } from "@/lib/utils";

/** "Mixed Hopes" gradient. */
export const GradientMixedHopes_CSS = "linear-gradient(0deg, #c471f5 0%, #fa71cd 100%)";

export function GradientMixedHopes({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #c471f5 0%, #fa71cd 100%)", ...style }}
      {...props}
    />
  );
}
