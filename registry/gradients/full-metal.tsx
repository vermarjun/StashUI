import * as React from "react";
import { cn } from "@/lib/utils";

/** "Full Metal" gradient. */
export const GradientFullMetal_CSS = "linear-gradient(0deg, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%)";

export function GradientFullMetal({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%)", ...style }}
      {...props}
    />
  );
}
