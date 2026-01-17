import * as React from "react";
import { cn } from "@/lib/utils";

/** "Saint Petersburg" gradient. */
export const GradientSaintPetersburg_CSS = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";

export function GradientSaintPetersburg({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", ...style }}
      {...props}
    />
  );
}
