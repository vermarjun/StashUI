import * as React from "react";
import { cn } from "@/lib/utils";

/** "Colorful Peach" gradient. */
export const GradientColorfulPeach_CSS = "linear-gradient(0deg, #ed6ea0 0%, #ec8c69 100%)";

export function GradientColorfulPeach({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ed6ea0 0%, #ec8c69 100%)", ...style }}
      {...props}
    />
  );
}
