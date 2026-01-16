import * as React from "react";
import { cn } from "@/lib/utils";

/** "Flying Lemon" gradient. */
export const GradientFlyingLemon_CSS = "linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%)";

export function GradientFlyingLemon({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%)", ...style }}
      {...props}
    />
  );
}
