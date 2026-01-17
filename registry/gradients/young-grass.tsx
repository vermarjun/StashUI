import * as React from "react";
import { cn } from "@/lib/utils";

/** "Young Grass" gradient. */
export const GradientYoungGrass_CSS = "linear-gradient(0deg, #9be15d 0%, #00e3ae 100%)";

export function GradientYoungGrass({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #9be15d 0%, #00e3ae 100%)", ...style }}
      {...props}
    />
  );
}
