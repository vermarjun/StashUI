import * as React from "react";
import { cn } from "@/lib/utils";

/** "Old Hat" gradient. */
export const GradientOldHat_CSS = "linear-gradient(0deg, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)";

export function GradientOldHat({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)", ...style }}
      {...props}
    />
  );
}
