import * as React from "react";
import { cn } from "@/lib/utils";

/** "Magic Lake" gradient. */
export const GradientMagicLake_CSS = "linear-gradient(0deg, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%)";

export function GradientMagicLake({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%)", ...style }}
      {...props}
    />
  );
}
