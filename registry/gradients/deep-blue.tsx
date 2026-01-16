import * as React from "react";
import { cn } from "@/lib/utils";

/** "Deep Blue" gradient. */
export const GradientDeepBlue_CSS = "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)";

export function GradientDeepBlue({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)", ...style }}
      {...props}
    />
  );
}
