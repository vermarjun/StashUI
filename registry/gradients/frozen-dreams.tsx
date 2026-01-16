import * as React from "react";
import { cn } from "@/lib/utils";

/** "Frozen Dreams" gradient. */
export const GradientFrozenDreams_CSS = "linear-gradient(0deg, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)";

export function GradientFrozenDreams({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)", ...style }}
      {...props}
    />
  );
}
