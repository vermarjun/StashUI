import * as React from "react";
import { cn } from "@/lib/utils";

/** "Shady Water" gradient. */
export const GradientShadyWater_CSS = "linear-gradient(0deg, #74ebd5 0%, #9face6 100%)";

export function GradientShadyWater({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #74ebd5 0%, #9face6 100%)", ...style }}
      {...props}
    />
  );
}
