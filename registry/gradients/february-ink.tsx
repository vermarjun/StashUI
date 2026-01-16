import * as React from "react";
import { cn } from "@/lib/utils";

/** "February Ink" gradient. */
export const GradientFebruaryInk_CSS = "linear-gradient(0deg, #accbee 0%, #e7f0fd 100%)";

export function GradientFebruaryInk({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #accbee 0%, #e7f0fd 100%)", ...style }}
      {...props}
    />
  );
}
