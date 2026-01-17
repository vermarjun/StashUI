import * as React from "react";
import { cn } from "@/lib/utils";

/** "New Retrowave" gradient. */
export const GradientNewRetrowave_CSS = "linear-gradient(0deg, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%)";

export function GradientNewRetrowave({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%)", ...style }}
      {...props}
    />
  );
}
