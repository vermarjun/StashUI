import * as React from "react";
import { cn } from "@/lib/utils";

/** "Morning Salad" gradient. */
export const GradientMorningSalad_CSS = "linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%)";

export function GradientMorningSalad({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%)", ...style }}
      {...props}
    />
  );
}
