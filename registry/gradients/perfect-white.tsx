import * as React from "react";
import { cn } from "@/lib/utils";

/** "Perfect White" gradient. */
export const GradientPerfectWhite_CSS = "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)";

export function GradientPerfectWhite({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)", ...style }}
      {...props}
    />
  );
}
