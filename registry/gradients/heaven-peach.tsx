import * as React from "react";
import { cn } from "@/lib/utils";

/** "Heaven Peach" gradient. */
export const GradientHeavenPeach_CSS = "linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)";

export function GradientHeavenPeach({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)", ...style }}
      {...props}
    />
  );
}
