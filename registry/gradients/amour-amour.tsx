import * as React from "react";
import { cn } from "@/lib/utils";

/** "Amour Amour" gradient. */
export const GradientAmourAmour_CSS = "linear-gradient(0deg, #f77062 0%, #fe5196 100%)";

export function GradientAmourAmour({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #f77062 0%, #fe5196 100%)", ...style }}
      {...props}
    />
  );
}
