import * as React from "react";
import { cn } from "@/lib/utils";

/** "Red Salvation" gradient. */
export const GradientRedSalvation_CSS = "linear-gradient(0deg, #f43b47 0%, #453a94 100%)";

export function GradientRedSalvation({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #f43b47 0%, #453a94 100%)", ...style }}
      {...props}
    />
  );
}
