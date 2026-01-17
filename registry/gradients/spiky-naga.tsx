import * as React from "react";
import { cn } from "@/lib/utils";

/** "Spiky Naga" gradient. */
export const GradientSpikyNaga_CSS = "linear-gradient(0deg, #505285 0%, #585e92 12%, #65689f 25%)";

export function GradientSpikyNaga({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #505285 0%, #585e92 12%, #65689f 25%)", ...style }}
      {...props}
    />
  );
}
