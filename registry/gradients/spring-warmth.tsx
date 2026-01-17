import * as React from "react";
import { cn } from "@/lib/utils";

/** "Spring Warmth" gradient. */
export const GradientSpringWarmth_CSS = "linear-gradient(0deg, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)";

export function GradientSpringWarmth({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)", ...style }}
      {...props}
    />
  );
}
