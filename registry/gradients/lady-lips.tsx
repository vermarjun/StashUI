import * as React from "react";
import { cn } from "@/lib/utils";

/** "Lady Lips" gradient. */
export const GradientLadyLips_CSS = "linear-gradient(0deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)";

export function GradientLadyLips({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)", ...style }}
      {...props}
    />
  );
}
