import * as React from "react";
import { cn } from "@/lib/utils";

/** "River City" gradient. */
export const GradientRiverCity_CSS = "linear-gradient(0deg, #4481eb 0%, #04befe 100%)";

export function GradientRiverCity({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #4481eb 0%, #04befe 100%)", ...style }}
      {...props}
    />
  );
}
