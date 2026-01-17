import * as React from "react";
import { cn } from "@/lib/utils";

/** "Plum Bath" gradient. */
export const GradientPlumBath_CSS = "linear-gradient(0deg, #cc208e 0%, #6713d2 100%)";

export function GradientPlumBath({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #cc208e 0%, #6713d2 100%)", ...style }}
      {...props}
    />
  );
}
