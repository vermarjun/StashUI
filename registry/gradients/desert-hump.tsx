import * as React from "react";
import { cn } from "@/lib/utils";

/** "Desert Hump" gradient. */
export const GradientDesertHump_CSS = "linear-gradient(0deg, #c79081 0%, #dfa579 100%)";

export function GradientDesertHump({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #c79081 0%, #dfa579 100%)", ...style }}
      {...props}
    />
  );
}
