import * as React from "react";
import { cn } from "@/lib/utils";

/** "Elegance" gradient. */
export const GradientElegance_CSS = "linear-gradient(0deg, #EADFDF 59%, #ECE2DF 100%)";

export function GradientElegance({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #EADFDF 59%, #ECE2DF 100%)", ...style }}
      {...props}
    />
  );
}
