import * as React from "react";
import { cn } from "@/lib/utils";

/** "Juicy Peach" gradient. */
export const GradientJuicyPeach_CSS = "linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)";

export function GradientJuicyPeach({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)", ...style }}
      {...props}
    />
  );
}
