import * as React from "react";
import { cn } from "@/lib/utils";

/** "Mole Hall" gradient. */
export const GradientMoleHall_CSS = "linear-gradient(-20deg, #616161 0%, #9bc5c3 100%)";

export function GradientMoleHall({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #616161 0%, #9bc5c3 100%)", ...style }}
      {...props}
    />
  );
}
