import * as React from "react";
import { cn } from "@/lib/utils";

/** "Kind Steel" gradient. */
export const GradientKindSteel_CSS = "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)";

export function GradientKindSteel({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)", ...style }}
      {...props}
    />
  );
}
