import * as React from "react";
import { cn } from "@/lib/utils";

/** "Crystalline" gradient. */
export const GradientCrystalline_CSS = "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)";

export function GradientCrystalline({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)", ...style }}
      {...props}
    />
  );
}
