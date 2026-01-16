import * as React from "react";
import { cn } from "@/lib/utils";

/** "Blessing" gradient. */
export const GradientBlessing_CSS = "linear-gradient(0deg, #fddb92 0%, #d1fdff 100%)";

export function GradientBlessing({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #fddb92 0%, #d1fdff 100%)", ...style }}
      {...props}
    />
  );
}
