import * as React from "react";
import { cn } from "@/lib/utils";

/** "Alchemist Lab" gradient. */
export const GradientAlchemistLab_CSS = "linear-gradient(-20deg, #d558c8 0%, #24d292 100%)";

export function GradientAlchemistLab({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #d558c8 0%, #24d292 100%)", ...style }}
      {...props}
    />
  );
}
