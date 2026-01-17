import * as React from "react";
import { cn } from "@/lib/utils";

/** "Soft Grass" gradient. */
export const GradientSoftGrass_CSS = "linear-gradient(0deg, #c1dfc4 0%, #deecdd 100%)";

export function GradientSoftGrass({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #c1dfc4 0%, #deecdd 100%)", ...style }}
      {...props}
    />
  );
}
