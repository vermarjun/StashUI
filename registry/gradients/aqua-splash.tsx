import * as React from "react";
import { cn } from "@/lib/utils";

/** "Aqua Splash" gradient. */
export const GradientAquaSplash_CSS = "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)";

export function GradientAquaSplash({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)", ...style }}
      {...props}
    />
  );
}
