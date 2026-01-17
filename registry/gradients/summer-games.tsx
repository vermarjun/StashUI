import * as React from "react";
import { cn } from "@/lib/utils";

/** "Summer Games" gradient. */
export const GradientSummerGames_CSS = "linear-gradient(0deg, #92fe9d 0%, #00c9ff 100%)";

export function GradientSummerGames({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #92fe9d 0%, #00c9ff 100%)", ...style }}
      {...props}
    />
  );
}
