import * as React from "react";
import { cn } from "@/lib/utils";

/** "Crystal River" gradient. */
export const GradientCrystalRiver_CSS = "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)";

export function GradientCrystalRiver({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", ...style }}
      {...props}
    />
  );
}
