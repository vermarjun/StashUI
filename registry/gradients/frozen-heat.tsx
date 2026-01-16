import * as React from "react";
import { cn } from "@/lib/utils";

/** "Frozen Heat" gradient. */
export const GradientFrozenHeat_CSS = "linear-gradient(-225deg, #FF057C 0%, #7C64D5 48%, #4CC3FF 100%)";

export function GradientFrozenHeat({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #FF057C 0%, #7C64D5 48%, #4CC3FF 100%)", ...style }}
      {...props}
    />
  );
}
