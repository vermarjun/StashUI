import * as React from "react";
import { cn } from "@/lib/utils";

/** "Grass Shampoo" gradient. */
export const GradientGrassShampoo_CSS = "linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%)";

export function GradientGrassShampoo({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%)", ...style }}
      {...props}
    />
  );
}
