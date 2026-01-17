import * as React from "react";
import { cn } from "@/lib/utils";

/** "Raccoon Back" gradient. */
export const GradientRaccoonBack_CSS = "linear-gradient(-180deg, #BCC5CE 0%, #929EAD 98%)";

export function GradientRaccoonBack({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-180deg, #BCC5CE 0%, #929EAD 98%)", ...style }}
      {...props}
    />
  );
}
