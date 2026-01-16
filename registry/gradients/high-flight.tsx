import * as React from "react";
import { cn } from "@/lib/utils";

/** "High Flight" gradient. */
export const GradientHighFlight_CSS = "linear-gradient(0deg, #0acffe 0%, #495aff 100%)";

export function GradientHighFlight({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #0acffe 0%, #495aff 100%)", ...style }}
      {...props}
    />
  );
}
