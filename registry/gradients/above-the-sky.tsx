import * as React from "react";
import { cn } from "@/lib/utils";

/** "Above The Sky" gradient. */
export const GradientAboveTheSky_CSS = "linear-gradient(0deg, #d3d3d3 0%, #d3d3d3 1%, #e0e0e0 26%)";

export function GradientAboveTheSky({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #d3d3d3 0%, #d3d3d3 1%, #e0e0e0 26%)", ...style }}
      {...props}
    />
  );
}
