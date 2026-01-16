import * as React from "react";
import { cn } from "@/lib/utils";

/** "Dusty Grass" gradient. */
export const GradientDustyGrass_CSS = "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)";

export function GradientDustyGrass({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)", ...style }}
      {...props}
    />
  );
}
