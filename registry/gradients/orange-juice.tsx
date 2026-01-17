import * as React from "react";
import { cn } from "@/lib/utils";

/** "Orange Juice" gradient. */
export const GradientOrangeJuice_CSS = "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)";

export function GradientOrangeJuice({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)", ...style }}
      {...props}
    />
  );
}
