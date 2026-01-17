import * as React from "react";
import { cn } from "@/lib/utils";

/** "Rainy Ashville" gradient. */
export const GradientRainyAshville_CSS = "linear-gradient(0deg, #fbc2eb 0%, #a6c1ee 100%)";

export function GradientRainyAshville({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #fbc2eb 0%, #a6c1ee 100%)", ...style }}
      {...props}
    />
  );
}
