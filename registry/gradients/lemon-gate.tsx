import * as React from "react";
import { cn } from "@/lib/utils";

/** "Lemon Gate" gradient. */
export const GradientLemonGate_CSS = "linear-gradient(0deg, #96fbc4 0%, #f9f586 100%)";

export function GradientLemonGate({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #96fbc4 0%, #f9f586 100%)", ...style }}
      {...props}
    />
  );
}
