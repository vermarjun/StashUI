import * as React from "react";
import { cn } from "@/lib/utils";

/** "Tempting Azure" gradient. */
export const GradientTemptingAzure_CSS = "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";

export function GradientTemptingAzure({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)", ...style }}
      {...props}
    />
  );
}
