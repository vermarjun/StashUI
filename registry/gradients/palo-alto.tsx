import * as React from "react";
import { cn } from "@/lib/utils";

/** "Palo Alto" gradient. */
export const GradientPaloAlto_CSS = "linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)";

export function GradientPaloAlto({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)", ...style }}
      {...props}
    />
  );
}
