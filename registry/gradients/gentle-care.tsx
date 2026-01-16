import * as React from "react";
import { cn } from "@/lib/utils";

/** "Gentle Care" gradient. */
export const GradientGentleCare_CSS = "linear-gradient(0deg, #ffc3a0 0%, #ffafbd 100%)";

export function GradientGentleCare({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ffc3a0 0%, #ffafbd 100%)", ...style }}
      {...props}
    />
  );
}
