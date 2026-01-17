import * as React from "react";
import { cn } from "@/lib/utils";

/** "Space Shift" gradient. */
export const GradientSpaceShift_CSS = "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)";

export function GradientSpaceShift({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)", ...style }}
      {...props}
    />
  );
}
