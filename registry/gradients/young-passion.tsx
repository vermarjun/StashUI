import * as React from "react";
import { cn } from "@/lib/utils";

/** "Young Passion" gradient. */
export const GradientYoungPassion_CSS = "linear-gradient(90deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)";

export function GradientYoungPassion({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(90deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", ...style }}
      {...props}
    />
  );
}
