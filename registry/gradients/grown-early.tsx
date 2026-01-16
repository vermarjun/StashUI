import * as React from "react";
import { cn } from "@/lib/utils";

/** "Grown Early" gradient. */
export const GradientGrownEarly_CSS = "linear-gradient(0deg, #0ba360 0%, #3cba92 100%)";

export function GradientGrownEarly({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #0ba360 0%, #3cba92 100%)", ...style }}
      {...props}
    />
  );
}
