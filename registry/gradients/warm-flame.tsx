import * as React from "react";
import { cn } from "@/lib/utils";

/** "Warm Flame" gradient. */
export const GradientWarmFlame_CSS = "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)";

export function GradientWarmFlame({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)", ...style }}
      {...props}
    />
  );
}
