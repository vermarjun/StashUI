import * as React from "react";
import { cn } from "@/lib/utils";

/** "North Miracle" gradient. */
export const GradientNorthMiracle_CSS = "linear-gradient(0deg, #00dbde 0%, #fc00ff 100%)";

export function GradientNorthMiracle({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #00dbde 0%, #fc00ff 100%)", ...style }}
      {...props}
    />
  );
}
