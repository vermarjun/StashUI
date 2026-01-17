import * as React from "react";
import { cn } from "@/lib/utils";

/** "Night Sky" gradient. */
export const GradientNightSky_CSS = "linear-gradient(0deg, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)";

export function GradientNightSky({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)", ...style }}
      {...props}
    />
  );
}
