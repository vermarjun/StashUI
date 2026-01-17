import * as React from "react";
import { cn } from "@/lib/utils";

/** "Seashore" gradient. */
export const GradientSeashore_CSS = "linear-gradient(0deg, #209cff 0%, #68e0cf 100%)";

export function GradientSeashore({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #209cff 0%, #68e0cf 100%)", ...style }}
      {...props}
    />
  );
}
