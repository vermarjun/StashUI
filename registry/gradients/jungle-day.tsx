import * as React from "react";
import { cn } from "@/lib/utils";

/** "Jungle Day" gradient. */
export const GradientJungleDay_CSS = "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%)";

export function GradientJungleDay({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%)", ...style }}
      {...props}
    />
  );
}
