import * as React from "react";
import { cn } from "@/lib/utils";

/** "Polite Rumors" gradient. */
export const GradientPoliteRumors_CSS = "linear-gradient(0deg, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)";

export function GradientPoliteRumors({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)", ...style }}
      {...props}
    />
  );
}
