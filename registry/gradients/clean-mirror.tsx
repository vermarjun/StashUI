import * as React from "react";
import { cn } from "@/lib/utils";

/** "Clean Mirror" gradient. */
export const GradientCleanMirror_CSS = "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)";

export function GradientCleanMirror({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)", ...style }}
      {...props}
    />
  );
}
