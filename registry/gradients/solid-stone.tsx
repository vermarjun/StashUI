import * as React from "react";
import { cn } from "@/lib/utils";

/** "Solid Stone" gradient. */
export const GradientSolidStone_CSS = "linear-gradient(0deg, #243949 0%, #517fa4 100%)";

export function GradientSolidStone({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #243949 0%, #517fa4 100%)", ...style }}
      {...props}
    />
  );
}
