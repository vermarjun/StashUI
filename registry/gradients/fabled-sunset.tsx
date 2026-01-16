import * as React from "react";
import { cn } from "@/lib/utils";

/** "Fabled Sunset" gradient. */
export const GradientFabledSunset_CSS = "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%)";

export function GradientFabledSunset({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%)", ...style }}
      {...props}
    />
  );
}
