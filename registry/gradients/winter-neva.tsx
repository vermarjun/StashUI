import * as React from "react";
import { cn } from "@/lib/utils";

/** "Winter Neva" gradient. */
export const GradientWinterNeva_CSS = "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";

export function GradientWinterNeva({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)", ...style }}
      {...props}
    />
  );
}
