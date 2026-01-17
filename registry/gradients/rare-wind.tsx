import * as React from "react";
import { cn } from "@/lib/utils";

/** "Rare Wind" gradient. */
export const GradientRareWind_CSS = "linear-gradient(0deg, #a8edea 0%, #fed6e3 100%)";

export function GradientRareWind({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #a8edea 0%, #fed6e3 100%)", ...style }}
      {...props}
    />
  );
}
