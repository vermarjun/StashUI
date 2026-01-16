import * as React from "react";
import { cn } from "@/lib/utils";

/** "Burning Spring" gradient. */
export const GradientBurningSpring_CSS = "linear-gradient(0deg, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 80%, #432c39 100%)";

export function GradientBurningSpring({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 80%, #432c39 100%)", ...style }}
      {...props}
    />
  );
}
