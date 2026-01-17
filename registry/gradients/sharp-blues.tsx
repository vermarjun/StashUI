import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sharp Blues" gradient. */
export const GradientSharpBlues_CSS = "linear-gradient(0deg, #00c6fb 0%, #005bea 100%)";

export function GradientSharpBlues({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #00c6fb 0%, #005bea 100%)", ...style }}
      {...props}
    />
  );
}
