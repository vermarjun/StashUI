import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sugar Lollipop" gradient. */
export const GradientSugarLollipop_CSS = "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)";

export function GradientSugarLollipop({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)", ...style }}
      {...props}
    />
  );
}
