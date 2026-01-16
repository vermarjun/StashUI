import * as React from "react";
import { cn } from "@/lib/utils";

/** "Fruit Blend" gradient. */
export const GradientFruitBlend_CSS = "linear-gradient(0deg, #f9d423 0%, #ff4e50 100%)";

export function GradientFruitBlend({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #f9d423 0%, #ff4e50 100%)", ...style }}
      {...props}
    />
  );
}
