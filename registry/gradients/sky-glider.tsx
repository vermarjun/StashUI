import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sky Glider" gradient. */
export const GradientSkyGlider_CSS = "linear-gradient(0deg, #88d3ce 0%, #6e45e2 100%)";

export function GradientSkyGlider({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #88d3ce 0%, #6e45e2 100%)", ...style }}
      {...props}
    />
  );
}
