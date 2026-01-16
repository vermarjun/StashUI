import * as React from "react";
import { cn } from "@/lib/utils";

/** "Cold Evening" gradient. */
export const GradientColdEvening_CSS = "linear-gradient(0deg, #0c3483 0%, #a2b6df 100%, #6b8cce 100%)";

export function GradientColdEvening({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #0c3483 0%, #a2b6df 100%, #6b8cce 100%)", ...style }}
      {...props}
    />
  );
}
