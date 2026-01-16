import * as React from "react";
import { cn } from "@/lib/utils";

/** "Mars Party" gradient. */
export const GradientMarsParty_CSS = "linear-gradient(0deg, #5f72bd 0%, #9b23ea 100%)";

export function GradientMarsParty({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #5f72bd 0%, #9b23ea 100%)", ...style }}
      {...props}
    />
  );
}
