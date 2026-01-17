import * as React from "react";
import { cn } from "@/lib/utils";

/** "Zeus Miracle" gradient. */
export const GradientZeusMiracle_CSS = "linear-gradient(0deg, #cd9cf2 0%, #f6f3ff 100%)";

export function GradientZeusMiracle({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #cd9cf2 0%, #f6f3ff 100%)", ...style }}
      {...props}
    />
  );
}
