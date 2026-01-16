import * as React from "react";
import { cn } from "@/lib/utils";

/** "Millennium Pine" gradient. */
export const GradientMillenniumPine_CSS = "linear-gradient(0deg, #50cc7f 0%, #f5d100 100%)";

export function GradientMillenniumPine({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #50cc7f 0%, #f5d100 100%)", ...style }}
      {...props}
    />
  );
}
