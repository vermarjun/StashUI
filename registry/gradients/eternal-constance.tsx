import * as React from "react";
import { cn } from "@/lib/utils";

/** "Eternal Constance" gradient. */
export const GradientEternalConstance_CSS = "linear-gradient(0deg, #09203f 0%, #537895 100%)";

export function GradientEternalConstance({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #09203f 0%, #537895 100%)", ...style }}
      {...props}
    />
  );
}
