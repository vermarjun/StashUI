import * as React from "react";
import { cn } from "@/lib/utils";

/** "Near Moon" gradient. */
export const GradientNearMoon_CSS = "linear-gradient(0deg, #5ee7df 0%, #b490ca 100%)";

export function GradientNearMoon({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #5ee7df 0%, #b490ca 100%)", ...style }}
      {...props}
    />
  );
}
