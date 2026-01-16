import * as React from "react";
import { cn } from "@/lib/utils";

/** "Dirty Beauty" gradient. */
export const GradientDirtyBeauty_CSS = "linear-gradient(0deg, #6a85b6 0%, #bac8e0 100%)";

export function GradientDirtyBeauty({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #6a85b6 0%, #bac8e0 100%)", ...style }}
      {...props}
    />
  );
}
