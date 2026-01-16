import * as React from "react";
import { cn } from "@/lib/utils";

/** "Ladoga Bottom" gradient. */
export const GradientLadogaBottom_CSS = "linear-gradient(0deg, #ebc0fd 0%, #d9ded8 100%)";

export function GradientLadogaBottom({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ebc0fd 0%, #d9ded8 100%)", ...style }}
      {...props}
    />
  );
}
