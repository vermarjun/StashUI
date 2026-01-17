import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sharpeye Eagle" gradient. */
export const GradientSharpeyeEagle_CSS = "linear-gradient(0deg, #9890e3 0%, #b1f4cf 100%)";

export function GradientSharpeyeEagle({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #9890e3 0%, #b1f4cf 100%)", ...style }}
      {...props}
    />
  );
}
