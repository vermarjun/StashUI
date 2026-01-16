import * as React from "react";
import { cn } from "@/lib/utils";

/** "Cochiti Lake" gradient. */
export const GradientCochitiLake_CSS = "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)";

export function GradientCochitiLake({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)", ...style }}
      {...props}
    />
  );
}
