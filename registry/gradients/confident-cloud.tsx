import * as React from "react";
import { cn } from "@/lib/utils";

/** "Confident Cloud" gradient. */
export const GradientConfidentCloud_CSS = "linear-gradient(0deg, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%)";

export function GradientConfidentCloud({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%)", ...style }}
      {...props}
    />
  );
}
