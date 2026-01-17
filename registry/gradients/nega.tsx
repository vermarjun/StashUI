import * as React from "react";
import { cn } from "@/lib/utils";

/** "Nega" gradient. */
export const GradientNega_CSS = "linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)";

export function GradientNega({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)", ...style }}
      {...props}
    />
  );
}
